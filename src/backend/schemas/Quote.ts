import zod from "zod";

const dateRefine = (rawDate: string) => {
  const dateFormat = /^\d{2}-\d{2}-\d{4}$/;
  if (!dateFormat.test(rawDate)) return false;
  try {
    const [d, m, y] = rawDate.split("-").map((v) => parseInt(v));
    const date = new Date(y, m - 1, d);
    return (
      !isNaN(date.getTime()) &&
      date.getDate() === d &&
      date.getMonth() + 1 === m &&
      date.getFullYear() === y
    );
  } catch (e) {
    return false;
  }
};

export const dateSchema = zod.string().refine(dateRefine);

export const quoteSchema = zod.object({
  id: zod.string().min(1),
  author: zod.string().min(1),
  content: zod.string().min(1),
  date: dateSchema,
});

export type Quote = zod.infer<typeof quoteSchema>;
