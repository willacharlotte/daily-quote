import zod from "zod";
import { dateSchema } from "./Date";

export const quoteSchema = zod.object({
  id: zod.string().min(1),
  author: zod.string().min(1),
  content: zod.string().min(1),
  date: dateSchema,
});

export type Quote = zod.infer<typeof quoteSchema>;
