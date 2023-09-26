import { z } from "zod";

export const waitListShema = z.object({
  name: z.string().min(1, { message: "This field can not be empty" }),
  email: z
    .string()
    .min(1, { message: "This field can not be empty" })
    .email("Please enter a valid email address"),
});
