import { DynamoData, Quote } from "../schemas";

const dynamoDataToQuote = ({ Date, Id, Author, Quote }: DynamoData): Quote => ({
  date: Date.S,
  id: Id.S,
  author: Author.S,
  content: Quote.S,
});

export default dynamoDataToQuote;
