import { BaseModel } from "../core/index.ts";
import { z } from "../deps.ts";

export const AccountModel = BaseModel.extend({
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
});

export type Account = z.infer<typeof AccountModel>;
