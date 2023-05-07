import { z } from "../deps.ts";

export const CredentialsModel = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "You need to enter a valid email address" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password needs to be a string",
    })
    .min(5, { message: "Your password needs to be at least 5 characters long" })
    .max(100, { message: "Passwords can be no more than 100 characters long" }),
});

export type Credentials = z.infer<typeof CredentialsModel>;
