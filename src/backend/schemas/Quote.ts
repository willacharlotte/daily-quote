import zod from "zod";

export const quoteSchema = zod.object({
  id: zod.string().min(1),
  author: zod.string().min(1),
  content: zod.string().min(1),
  date: zod.date(),
});

export type Quote = zod.infer<typeof quoteSchema>;
