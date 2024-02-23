import { z } from "zod";

export const newIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title needs to be at least 1 character" })
    .max(255, { message: "Title can not be longer than 255 characters" }),
  description: z.string().min(5, { message: "Description should be at least 5 characters long" }),
});
