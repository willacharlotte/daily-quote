import * as zod from "zod";
import { dateSchema } from "./Date";

export const dynamoDataSchema = zod.object({
  Date: zod.object({ S: dateSchema }),
  Quote: zod.object({ S: zod.string().min(1) }),
  Author: zod.object({ S: zod.string().min(1) }),
  Id: zod.object({ S: zod.string().min(1) }),
});

export type DynamoData = zod.infer<typeof dynamoDataSchema>;

export const dynamoDocItemSchema = zod.object({
  Date: dateSchema,
  Quote: zod.string().min(1),
  Author: zod.string().min(1),
  Id: zod.string().min(1),
});
