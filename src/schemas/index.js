import { z } from "zod";
import validator from "validator";
import { isWaitlisted } from "@services";

// HDR --------------WAITLIST SCHEMA----------------
export const waitListSchema = z.object({
  name: z.string().min(1, { message: "This field can not be empty" }),
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
});

// HDR: -------------LOGIN SCHEMA----------------
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
  password: z.string().min(1, { message: "This field can not be empty" }),
});

// HDR: --------------REGISTER SCHEMA----------------
export const registerSchema = z.object({
  first_name: z.string().min(1, { message: "This field can not be empty" }),
  last_name: z.string().min(1, { message: "This field can not be empty" }),
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
  password: z.string().min(1, { message: "This field can not be empty" }),
});

// HDR: --------------PERSONAL INFO SCHEMA----------------
export const personInfoSchema = z.object({
  name: z.string().min(1, { message: "This field can not be empty" }),
  phone_number: z
    .string()
    .min(10, { message: "This field must be valid" })
    .refine(validator.isMobilePhone),
  address: z.string().min(10, { message: "This field can not be empty" }),
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),

  state: z.string().min(1, {
    message: "Please select your state",
  }),
  lga: z.string().min(1, {
    message: "Please select your local government area",
  }),
  impact: z.string().min(1, {
    message: "Please select a social impact project",
  }),
});

// HDR: -------------RESET SCHEMA----------------
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

// HDR:-----------RADIO SCHEMA----------------------------

// SUB: creating a new user
export const radioSchema = z.object({
  preference: z.string().min(1, { message: "Please select one" }),
});

// HDR: ----------------ACCOUNT UPDATE ------------------------

export const accountUpdateSchema = z.object({
  first_name: z.string().min(1, { message: "This field can not be empty" }),
  last_name: z.string().min(1, { message: "This field can not be empty" }),
  phone_number: z
    .string()
    .min(10, { message: "This field must be valid" })
    .refine(validator.isMobilePhone),
  address: z.string().min(10, { message: "This field can not be empty" }),
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),

  state: z.string().min(1, {
    message: "Please select your state",
  }),
  lga: z.string().min(1, {
    message: "Please select your local government area",
  }),
});

// HDR: CMS SCHEMA

// SUB: new product form schema

export const newProductSchema = z.object({
  product: z.string().min(1, { message: "This field can not be empty" }),
  stock: z.number().min(1, { message: "This field can not be empty" }),
  colour: z.string().min(1),
  category: z.string().min(1),
  preference: z.string().min(1),
  size: z.string().min(1),
  description: z.string().min(1, { message: "This field can not be empty" }),
  price: z.number().min(1, { message: "This field can not be empty" }),
  key: z.string().optional(true),
  id: z.number().optional(true),
});
export const editProductSchema = z.object({
  product: z.string().min(1, { message: "This field can not be empty" }),
  stock: z.number().min(1, { message: "This field can not be empty" }),
  colour: z.string().min(1),
  category: z.string().min(1),
  preference: z.string().min(1),
  size: z.string().min(1),
  price: z.number().min(1, { message: "This field can not be empty" }),
});

// SUB: New size form schema

export const addSizeSchema = z.object({
  sizename: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "The name must start with an uppercase letter.",
    }),
  sizevalue: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .regex(/^[A-Z]+$/, "Must be uppercase and no spaces"),
  stock: z.number().optional(true),
  key: z.string().optional(true),
  id: z.number().optional(true),
});

// SUB: New colour form schema

export const newColourSchema = z.object({
  colour: z.string().min(1, { message: "This field can not be empty" }),
  hex: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .refine((value) => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value), {
      message: "Please input a valid hexcode number including #",
    }),
  stock: z.number().optional(true),
  key: z.string().optional(true),
  id: z.number().optional(true),
});

// SUB: New preference form schema
export const preferencesSchema = z.object({
  preference: z.string().min(1, { message: "This field can not be empty" }),
  stock: z.number().optional(true),
  key: z.string().optional(true),
  id: z.number().optional(true),
});

// SUB: New category form schema

export const categorySchema = z.object({
  category: z.string().min(1, { message: "This field can not be empty" }),
  stock: z.number().optional(true),
  key: z.string().optional(true),
  id: z.number().optional(true),
});
