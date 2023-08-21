import { ENV } from "../config/env";
import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Quote, dynamoDataSchema, dynamoDocItemSchema } from "../schemas";
import dynamoDataToQuote from "../transformers/dynamoDataToQuote";

export namespace QuoteRepository {
  AWS.config.update({
    accessKeyId: ENV.AWS_DYNAMODB_ACCESSKEY,
    secretAccessKey: ENV.AWS_DYNAMODB_SECRETKEY,
    region: ENV.AWS_DYNAMODB_REGION,
  });

  const table = ENV.AWS_DYNAMODB_TABLE;
  const dynamodb = new AWS.DynamoDB();

  const processItems = (
    items: AWS.DynamoDB.ItemList
  ): { quotes: Quote[]; messages: string[] } => {
    const quotes: Quote[] = [];
    const messages: string[] = [];

    items
      .map((item) => dynamoDataSchema.safeParse(item))
      .forEach((item) => {
        if (item.success) {
          quotes.push(dynamoDataToQuote(item.data));
        } else {
          messages.push(...item.error.issues.map((issue) => issue.message));
        }
      });

    return { quotes, messages };
  };

  export const getOneByDate = async (
    date: string
  ): Promise<{ data?: Quote; messages: string[] }> => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: table,
        FilterExpression: "#dateAttr = :dateValue",
        ExpressionAttributeNames: {
          "#dateAttr": "Date",
        },
        ExpressionAttributeValues: {
          ":dateValue": { S: date },
        },
      };

      const messages: string[] = [];

      dynamodb.scan(params, (err, data) => {
        if (err) {
          messages.push("Error scanning table: " + err.message);
          reject({ messages });
        } else if (data.Items === undefined || data.Items.length === 0) {
          messages.push("No items found.");
          resolve({ messages });
        } else {
          const { quotes, messages: processMessages } = processItems([
            data.Items[0],
          ]);
          messages.push(...processMessages);

          if (quotes.length === 0) {
            reject({ messages });
          } else {
            resolve({ data: quotes[0], messages });
          }
        }
      });
    });
  };

  const getRandomUUID = async (): Promise<{
    uuid: string | null;
    date: string | null;
  }> => {
    try {
      const params: DocumentClient.ScanInput = {
        TableName: table,
        ProjectionExpression: "#id, #date", // Use expression attribute names
        ExpressionAttributeNames: {
          "#id": "Id",
          "#date": "Date",
        },
      };
      const { Items } = await dynamodb.scan(params).promise();

      if (Items && Items.length > 0) {
        const randomIndex = Math.floor(Math.random() * Items.length);
        const randomUUIDAttributeValue = Items[randomIndex].Id;
        const randomDateAttributeValue = Items[randomIndex].Date;

        if (randomUUIDAttributeValue.S && randomDateAttributeValue.S) {
          return {
            uuid: randomUUIDAttributeValue.S,
            date: randomDateAttributeValue.S,
          };
        } else {
          return {
            uuid: null,
            date: null,
          };
        }
      } else {
        return {
          uuid: null,
          date: null,
        };
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  export const getOneRandom = async (): Promise<{
    data?: Quote;
    messages: string[];
  }> => {
    const dynamodbDoc = new DocumentClient();
    try {
      const { uuid, date } = await getRandomUUID();

      if (!uuid || !date) {
        throw new Error("Could not find uuid and date");
      }

      const params: DocumentClient.GetItemInput = {
        TableName: table,
        Key: {
          Id: uuid,
          Date: date,
        },
      };

      const { Item } = await dynamodbDoc.get(params).promise();

      const parsedItem = dynamoDocItemSchema.safeParse(Item);

      if (!parsedItem.success) {
        throw new Error("Error parsing item");
      }

      return {
        data: {
          id: parsedItem.data.Id,
          content: parsedItem.data.Quote,
          author: parsedItem.data.Author,
          date: parsedItem.data.Date,
        },
        messages: [],
      };
    } catch (error: any) {
      return { messages: ["An error occured", error?.message] };
    }
  };

  export const getAllByAuthor = async (
    author: string
  ): Promise<{ data?: Quote[]; messages: string[] }> => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: table,
        IndexName: "AuthorIndex", // Replace with the actual GSI name
        KeyConditionExpression: "#authorAttr = :authorValue",
        ExpressionAttributeNames: {
          "#authorAttr": "Author",
        },
        ExpressionAttributeValues: {
          ":authorValue": { S: author },
        },
      };

      const messages: string[] = [];

      dynamodb.query(params, (err, data) => {
        if (err) {
          messages.push("Error querying index:", err.message);
          reject({ messages });
        } else if (data.Items === undefined) {
          messages.push("No quotes by the given author were found");
          resolve({ data: [], messages });
        } else {
          const { quotes, messages: processMessages } = processItems(
            data.Items
          );
          messages.push(...processMessages);

          if (quotes.length !== data.Items.length) {
            messages.push("Format error on the incoming data");
            reject({ messages });
          } else {
            resolve({ data: quotes, messages });
          }
        }
      });
    });
  };

  export const getAll = async (): Promise<{
    data?: Quote[];
    messages: string[];
  }> => {
    return new Promise((resolve, reject) => {
      const params: DocumentClient.ScanInput = {
        TableName: table,
      };

      const messages: string[] = [];

      dynamodb.scan(params, (err, data) => {
        if (err) {
          messages.push("Error querying index:", err.message);
          reject({ messages });
        } else if (data.Items === undefined) {
          messages.push("No quotes were found");
          resolve({ data: [], messages });
        } else {
          const { quotes, messages: processMessages } = processItems(
            data.Items
          );
          messages.push(...processMessages);

          if (quotes.length !== data.Items.length) {
            messages.push("Format error on the incoming data");
            reject({ messages });
          } else {
            resolve({ data: quotes, messages });
          }
        }
      });
    });
  };
}
