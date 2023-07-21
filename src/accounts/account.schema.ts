import { EntitySchema, WithObjectId } from "../core/index.ts";
import { z } from "../deps.ts";

const accountType = z.enum(["Chequing", "Savings", "Credit Card", "Mortgage"]);

export const accountRequestBase = {
  name: z
    .string({
      required_error: "Account name is required",
      invalid_type_error: "Account name must be a string",
    })
    .min(5, { message: "Account name must be at least 5 characters long" })
    .max(100, {
      message: "Account name must be no longer than 100 characters long",
    }),
  color: z.string({
    required_error: "Account color is required",
    invalid_type_error: "Account color must be a string",
  }),
  description: z.string().nullable(),
  openingBalance: z.number(),
  openingBalanceAt: z
    .string()
    .datetime({ message: "Opening balance at must be a valid date string" }),
  type: accountType,
};

export const accountBase = {
  ...accountRequestBase,
  slug: z.string({
    required_error: "Account slug is required",
    invalid_type_error: "Account slug must be a string",
  }),
  openingBalanceAt: z.date({
    required_error: "Opening balance at must be a valid date",
  }),
};

export const CreateAccountRequestSchema = z.object(accountRequestBase).strict();
export const AccountBaseSchema = z.object(accountBase).strict();
export const AccountSchema = EntitySchema.extend(accountBase).strict();
export type AccountBase = z.infer<typeof AccountBaseSchema>;
export type CreateAccountRequest = z.infer<typeof CreateAccountRequestSchema>;
export type AccountType = z.infer<typeof accountType>;
type RawAccount = z.infer<typeof AccountSchema>;
export type Account = RawAccount & WithObjectId;
export type CreateAccountResponse = Account;
export type AccountResponse = Omit<
  Account,
  "openingBalanceAt" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  openingBalanceAt: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
};
