import { z } from "zod";

// issue validations

export const newIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title needs to be at least 1 character" })
    .max(255, { message: "Title can not be longer than 255 characters" }),
  description: z.string().min(5, { message: "Description should be at least 5 characters long" }),
});

// Auth validations
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password must be no longer than 32 characters")
  .trim()
  .refine((value) => /[a-z]/.test(value), { message: "Password must contain a lowercase letter" })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must contain an uppercase letter",
  })
  .refine((value) => /[0-9]/.test(value), { message: "Password must contain a number" })
  .refine((value) => /[!@#$%^&*]/.test(value), {
    message: "Password must contain a special character",
  });

export const registerSchema = z
  .object({
    name: z.string().min(1, {message: "Name is required"}),
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(1, { message: "Password is required" }),
});
