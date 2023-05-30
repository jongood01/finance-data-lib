import { EntitySchema, WithObjectId } from "../core/index.ts";
import { z } from "../deps.ts";

export const accountBase = {
  name: z
    .string({
      required_error: "Account name is required",
      invalid_type_error: "Account name must be a string",
    })
    .min(5, { message: "Account name must be at least 5 characters long" })
    .max(100, {
      message: "Account name must be no longer than 100 characters long",
    }),
  description: z.string().nullable(),
  openingBalance: z.number(),
  openingBalanceAt: z.date(),
  type: z.enum(["Chequing", "Savings", "Credit Card", "Mortgage"]),
};

export const CreateAccountRequestSchema = z.object(accountBase);
export const AccountBaseSchema = z.object(accountBase);
export const AccountSchema = EntitySchema.extend(accountBase);
export type AccountBase = z.infer<typeof AccountBaseSchema>;
export type CreateAccountRequest = z.infer<typeof CreateAccountRequestSchema>;
type RawAccount = z.infer<typeof AccountSchema>;
export type Account = RawAccount & WithObjectId;
