import { WithObjectId } from "../core/entity.schema.ts";
import { EntitySchema } from "../core/index.ts";
import { z } from "../deps.ts";

export const userBase = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "You need to enter a valid email address" }),
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "First name must be a string",
  }),
  lastName: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Last name must be a string",
  }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password needs to be a string",
    })
    .min(5, { message: "Your password needs to be at least 5 characters long" })
    .max(100, { message: "Passwords can be no more than 100 characters long" }),
};

export const UserBaseSchema = z.object(userBase).strict();
export const UserSchema = EntitySchema.extend(userBase).strict();
export type UserBase = z.infer<typeof UserBaseSchema>;
type RawUser = z.infer<typeof UserSchema>;
export type User = RawUser & WithObjectId;
