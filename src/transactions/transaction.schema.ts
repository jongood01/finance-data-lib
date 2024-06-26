import {
  EntitySchema,
  MapObjectDatesToStrings,
  WithObjectId,
} from "../core/index.ts";
import { z } from "../deps.ts";

export const transactionExternalBase = {
  accountId: z.string({
    required_error: "Account id is required",
    invalid_type_error: "Account id must be a string",
  }),
  description: z
    .string({
      required_error: "Transaction description is required",
      invalid_type_error: "Transaction description must be a string",
    })
    .min(5, {
      message: "Transaction description must be at least 5 characters long",
    })
    .max(200, {
      message:
        "Transaction description must be no longer than 200 characters long",
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
  transactionDate: z
    .string()
    .datetime({ message: "Transaction date at must be a valid date string" }),
  notes: z
    .string({
      invalid_type_error: "Transaction notes must be a string",
    })
    .max(500, {
      message: "Transaction notes must be no longer than 500 characters long",
    })
    .nullable(),
  siblingId: z
    .string({
      invalid_type_error: "Transaction sibling id must be a string or null",
    })
    .nullable(),
};

export const transactionBase = {
  ...transactionExternalBase,
  amountAllocatedIncome: z
    .number()
    .nonnegative()
    .max(999999)
    .step(0.01, { message: "Amount allocated income must be a valid decimal" }),
  amountAllocatedExpense: z.number().nonnegative().max(999999).step(0.01, {
    message: "Amount allocated expense must be a valid decimal",
  }),
  allocatedIncomeBudgetIds: z.array(z.string()),
  allocatedExpenseBudgetIds: z.array(z.string()),
  transactionDate: z.date({
    required_error: "Transaction date at must be a valid date",
  }),
};

export const transactionSummary = {
  index: z.number().nonnegative(),
  description: z
    .string({
      required_error: "Transaction summary description is required",
      invalid_type_error: "Transaction summary description must be a string",
    })
    .min(5, {
      message:
        "Transaction summary description must be at least 5 characters long",
    })
    .max(200, {
      message:
        "Transaction summary description must be no longer than 200 characters long",
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
  transactionDate: z.string().datetime({
    message: "Transaction summary date at must be a valid date string",
  }),
  notes: z
    .string({
      invalid_type_error: "Transaction summary notes must be a string",
    })
    .max(500, {
      message:
        "Transaction summary notes must be no longer than 500 characters long",
    })
    .nullable(),
};

export const TransactionExternalSchema = z
  .object(transactionExternalBase)
  .strict();
export const TransactionBaseSchema = z.object(transactionBase).strict();
export const TransactionSchema = EntitySchema.extend(transactionBase).strict();
export const TransactionSummarySchema = z.object(transactionSummary).strict();
export type TransactionBase = z.infer<typeof TransactionBaseSchema>;
type RawTransaction = z.infer<typeof TransactionSchema>;
export type Transaction = RawTransaction & WithObjectId;
export type TransactionExternal = z.infer<typeof TransactionExternalSchema>;
export type TransactionSummary = z.infer<typeof TransactionSummarySchema>;
export const CreateTransactionRequestSchema = z
  .object(transactionExternalBase)
  .strict();
export const UpdateTransactionRequestSchema = z
  .object({
    ...transactionExternalBase,
    id: z.string({
      required_error: "Transaction id is required",
      invalid_type_error: "Transaction id must be a string",
    }),
  })
  .strict();
export type CreateTransactionResponse = Transaction;
export type CreateTransactionRequest = z.infer<
  typeof TransactionExternalSchema
>;
export type TransactionResponse = MapObjectDatesToStrings<Transaction>;
export type UpdateTransactionRequest = z.infer<
  typeof UpdateTransactionRequestSchema
>;

export type IndexedTransaction = {
  index: number;
  result: Transaction[];
};

export type IndexedTransactionResult = IndexedTransaction[];
export type TransactionAutoAssign = {
  transaction: Transaction;
  budgetId: string;
};

export interface TransactionWithBudgetInfo extends Transaction {
  color: string;
  budgetLabelList: { name: string; color: string }[];
}
