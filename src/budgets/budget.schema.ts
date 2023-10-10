import {
  EntitySchema,
  MapObjectDatesToStrings,
  WithObjectId,
} from "../core/index.ts";
import { z } from "../deps.ts";

const budgetType = z.enum(["Income", "Expense", "Savings"]);

export const budgetExternalBase = {
  name: z
    .string({
      required_error: "Budget name is required",
      invalid_type_error: "Budget name must be a string",
    })
    .min(5, { message: "Budget name must be at least 5 characters long" })
    .max(100, {
      message: "Budget name must be no longer than 100 characters long",
    }),
  amount: z
    .number()
    .nonnegative()
    .max(999999)
    .step(0.01, { message: "Budget amount must be a valid decimal" }),
  amountPeriodDays: z
    .number()
    .nonnegative()
    .min(1, { message: "Budget amount period must be at least 1" })
    .max(365, { message: "Budget amount period must be a year or less" }),
  color: z.string({
    required_error: "Budget color is required",
    invalid_type_error: "Budget color must be a string",
  }),
  description: z.string().nullable(),
  openingBalance: z.number(),
  openingBalanceAt: z
    .string()
    .datetime({ message: "Opening balance at must be a valid date string" }),
  type: budgetType,
};

export const budgetBase = {
  ...budgetExternalBase,
  balance: z.number({
    required_error: "Budget balance is required",
    invalid_type_error: "Budget balance must be a number",
  }),
  slug: z.string({
    required_error: "Budget slug is required",
    invalid_type_error: "Budget slug must be a string",
  }),
  openingBalanceAt: z.date({
    required_error: "Opening balance at must be a valid date",
  }),
};

export const BudgetExternalSchema = z.object(budgetExternalBase).strict();
export const BudgetBaseSchema = z.object(budgetBase).strict();
export const BudgetSchema = EntitySchema.extend(budgetBase).strict();
export type BudgetBase = z.infer<typeof BudgetBaseSchema>;
export type BudgetType = z.infer<typeof budgetType>;
type RawBudget = z.infer<typeof BudgetSchema>;
export type Budget = RawBudget & WithObjectId;
export type BudgetExternal = z.infer<typeof BudgetExternalSchema>;
export const CreateBudgetRequestSchema = z.object(budgetExternalBase).strict();
export const UpdateBudgetRequestSchema = z
  .object({
    ...budgetExternalBase,
    id: z.string({
      required_error: "Budget id is required",
      invalid_type_error: "Budget id must be a string",
    }),
  })
  .strict();
export type CreateBudgetResponse = Budget;
export type CreateBudgetRequest = z.infer<typeof BudgetExternalSchema>;
export type BudgetResponse = MapObjectDatesToStrings<Budget>;
export type UpdateBudgetRequest = z.infer<typeof UpdateBudgetRequestSchema>;
export type BudgetSummary = Pick<Budget, "id" | "name" | "color" | "type">;
