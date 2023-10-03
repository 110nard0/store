import { z } from "zod";

// -----------------WAITLIST SCHEMA----------------
export const waitListSchema = z.object({
  name: z.string().min(1, { message: "This field can not be empty" }),
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
});

// -----------------LOGIN SCHEMA----------------
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
  password: z.string().min(1, { message: "This field can not be empty" }),
});

// -----------------REGISTER SCHEMA----------------
export const registerSchema = z.object({
  name: z.string().min(1, { message: "This field can not be empty" }),
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
  password: z.string().min(1, { message: "This field can not be empty" }),
});

// -----------------RESET SCHEMA----------------
export const resetSchema = z
  .object({
    password: z.string().min(1, { message: "This field is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const forgotSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
});

// -----------RADIO SCHEMA----------------------------
export const radioSchema = z.object({
  preference: z.string().min(1, { message: "Please select one" }),
});
