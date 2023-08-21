import * as zod from "zod";

const dateRefine = (rawDate: string) => {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormat.test(rawDate)) return false;
  try {
    const [y, m, d] = rawDate.split("-").map((v) => parseInt(v));
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
