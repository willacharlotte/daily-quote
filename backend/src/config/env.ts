import { config } from "dotenv";

config();

export const ENV = {
  PORT: process.env.PORT || "8080",
  AWS_DYNAMODB_ACCESSKEY: process.env.AWS_DYNAMODB_ACCESSKEY || "",
  AWS_DYNAMODB_SECRETKEY: process.env.AWS_DYNAMODB_SECRETKEY || "",
  AWS_DYNAMODB_TABLE: process.env.AWS_DYNAMODB_TABLE || "",
  AWS_DYNAMODB_REGION: process.env.AWS_DYNAMODB_REGION || "",
  ENVIRONMENT: process.env.ENVIRONMENT || "dev",
};
