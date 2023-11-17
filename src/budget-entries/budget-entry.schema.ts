import {
  EntitySchema,
  MapObjectDatesToStrings,
  WithObjectId,
} from "../core/index.ts";
import { z } from "../deps.ts";

export const budgetEntryExternalBase = {
  budgetId: z.string({
    required_error: "Budget id is required",
    invalid_type_error: "Budget id must be a string",
  }),
  transactionId: z.string({
    required_error: "Transaction id is required",
    invalid_type_error: "Transaction id must be a string",
  }),
  description: z
    .string({
      required_error: "Budget entry description is required",
      invalid_type_error: "Budget entry description must be a string",
    })
    .min(5, {
      message: "Budget entry description must be at least 5 characters long",
    })
    .max(200, {
      message:
        "Budget entry description must be no longer than 200 characters long",
    }),
  amountIn: z
    .number()
    .nonnegative()
    .max(999999)
    .step(0.01, { message: "Amount in must be a valid decimal" }),
  amountOut: z
    .number()
    .nonnegative()
    .max(999999)
    .step(0.01, { message: "Amount out must be a valid decimal" }),
  entryType: z.enum(["income", "expense"]),
  entryDate: z
    .string()
    .datetime({ message: "Budget entry date at must be a valid date string" }),
  notes: z
    .string({
      invalid_type_error: "Budget entry notes must be a string",
    })
    .max(500, {
      message: "Budget entry notes must be no longer than 500 characters long",
    })
    .nullable(),
};

export const budgetEntryBase = {
  ...budgetEntryExternalBase,
  entryDate: z.date({
    required_error: "Budget entry date at must be a valid date",
  }),
};

export const BudgetEntryExternalSchema = z
  .object(budgetEntryExternalBase)
  .strict();
export const BudgetEntryBaseSchema = z.object(budgetEntryBase).strict();
export const BudgetEntrySchema = EntitySchema.extend(budgetEntryBase).strict();
export type BudgetEntryBase = z.infer<typeof BudgetEntryBaseSchema>;
type RawBudgetEntry = z.infer<typeof BudgetEntrySchema>;
export type BudgetEntry = RawBudgetEntry & WithObjectId;
export type BudgetEntryExternal = z.infer<typeof BudgetEntryExternalSchema>;
export const CreateBudgetEntryRequestSchema = z
  .object(budgetEntryExternalBase)
  .strict();
export const UpdateBudgetEntryRequestSchema = z
  .object({
    ...budgetEntryExternalBase,
    id: z.string({
      required_error: "Budget Entry id is required",
      invalid_type_error: "Budget Entry id must be a string",
    }),
  })
  .strict();
export type CreateBudgetEntryResponse = BudgetEntry;
export type CreateBudgetEntryRequest = z.infer<
  typeof BudgetEntryExternalSchema
>;
export type AllocateIncomeBudgetEntryRequest = {
  incomeBudgetEntry: z.infer<typeof BudgetEntryExternalSchema>;
  expenseBudgetEntries: z.infer<typeof BudgetEntryExternalSchema>[];
};
export type AllocateExpenseBudgetEntryRequest = z.infer<
  typeof BudgetEntryExternalSchema
>[];
export type BudgetEntryResponse = MapObjectDatesToStrings<BudgetEntry>;
export type UpdateBudgetEntryRequest = z.infer<
  typeof UpdateBudgetEntryRequestSchema
>;
