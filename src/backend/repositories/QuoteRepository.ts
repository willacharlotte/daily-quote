import { ENV } from "../config/env";
import { Quote, dateSchema } from "../schemas/Quote";
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export namespace QuoteRepository {
  
  AWS.config.update({
    accessKeyId: ENV.AWS_DYNAMODB_ACCESSKEY,
    secretAccessKey: ENV.AWS_DYNAMODB_SECRETKEY,
    region: ENV.AWS_DYNAMODB_REGION,
    logger: console
  })
  
  const table = ENV.AWS_DYNAMODB_TABLE
  const dynamodb = new AWS.DynamoDB();
  
  export const getOneByDate = async (date: string): Promise<{ data: Record<string, any> | null, messages: string[] }> => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: table,
        FilterExpression: '#dateAttr = :dateValue',
        ExpressionAttributeNames: {
          '#dateAttr': 'Date'
        },
        ExpressionAttributeValues: {
          ':dateValue': { S: date }
        }
      };

      const messages: string[] = [];

      dynamodb.scan(params, (err, data) => {
        if (err) {
          messages.push('Error scanning table: ' + err.message);
          reject(err);
        } else {
          if (data.Items !== undefined && data.Items.length > 0) {
            const firstItem = data.Items[0];
            const quoteValue = firstItem.Quote.S;
            if (quoteValue !== undefined) {
              resolve({ data: firstItem, messages });
            } else {
              messages.push('Quote value is undefined.');
              resolve({ data: null, messages });
            }
          } else {
            messages.push('No items found.');
            resolve({ data: null, messages });
          }
        }
      });
    });
  };

  export const getRandomUUID = async (): Promise<{ uuid: string | null, date: string | null }> => {
    try {
      const params: DocumentClient.ScanInput = {
        TableName: table,
        ProjectionExpression: '#id, #date', // Use expression attribute names
        ExpressionAttributeNames: {
          '#id': 'Id',
          '#date': 'Date'
        }
      };
      const { Items } = await dynamodb.scan(params).promise();

      if (Items && Items.length > 0) {
        const randomIndex = Math.floor(Math.random() * Items.length);
        const randomUUIDAttributeValue = Items[randomIndex].Id;
        const randomDateAttributeValue = Items[randomIndex].Date;

        if (randomUUIDAttributeValue.S && randomDateAttributeValue.S) {
          return {
            uuid: randomUUIDAttributeValue.S,
            date: randomDateAttributeValue.S
          };
        } 
        else {
          return {
            uuid: null,
            date: null
          };
       }
      } 
      else {
        return {
          uuid: null,
          date: null
        };
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  };

  export const getOneRandom = async (): Promise<Record<string, any> | null> => {
    const dynamodbDoc = new DocumentClient();
    try {
      const { uuid, date } = await QuoteRepository.getRandomUUID();

      if (!uuid || !date) {
          return null;
      }

      const params: DocumentClient.GetItemInput = {
        TableName: table,
        Key: {
          "Id": uuid,
          "Date": date
        }
      };

      const { Item } = await dynamodbDoc.get(params).promise();

      if (Item) {
        return Item;
      } else {
        return null;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  };

  export const getAllByAuthor = async (author: string): Promise<{ data: Record<string, any> | null, messages: string[] }> => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: table,
        IndexName: 'AuthorIndex', // Replace with the actual GSI name
        KeyConditionExpression: '#authorAttr = :authorValue',
        ExpressionAttributeNames: {
          '#authorAttr': 'Author'
        },
        ExpressionAttributeValues: {
          ':authorValue': { S: author }
        }
        };

      const messages: string[] = [];

      dynamodb.query(params, (err, data) => {
        if (err) {
          console.error('Error querying index:', err);
          reject(err);
        } else {
          if (data.Items !== undefined) {
            resolve({ data: data.Items, messages });
          } else {
            messages.push("No quotes by the given author were found");
                resolve({ data: [], messages });
          }
        }
      });
    });
  };

export const getAll = async (): Promise<Array<Record<string, any>>> => {
  const params: DocumentClient.ScanInput = {
      TableName: table
  };

  return new Promise((resolve, reject) => {
    dynamodb.scan(params, (err, data) => {
      if (err) {
        console.error('Error scanning table:', err);
        reject(err);
      } else {
        if (data.Items !== undefined) {
          resolve(data.Items);
        } else {
          console.log('No items found.');
          resolve([]);
          }
        }
      });
    });
  };
}
