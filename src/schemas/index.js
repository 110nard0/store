import { z } from "zod";

export const waitListShema = z.object({
  name: z.string().min(1, { message: "This field can not be empty" }),
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
});

export const loginShema = z.object({
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
  password: z.string().min(1, { message: "This field can not be empty" }),
});

export const resetSchema = z.object({
  password: z.string().min(1, { message: "This field is required" }),
  confirmPassword: z.string().min(1, { message: "Password does not match" }),
});
