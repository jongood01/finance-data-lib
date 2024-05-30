import { EntitySchema, WithObjectId } from "../core/index.ts";
import { z } from "../deps.ts";

const type = z.enum([
  "save-amount",
  "save-target",
  "spend-amount",
  "spend-target",
]);
const amountType = z.enum(["$", "%"]);

const goalBase = {
  amount: z
    .number()
    .nonnegative()
    .max(999999)
    .step(0.01, { message: "Amount must be a valid decimal" }),
  amountType,
  goalDate: z
    .string()
    .datetime({ message: "Goal date at must be a valid date string" }),
  complete: z.boolean(),
  completeAmount: z
    .number()
    .nonnegative()
    .max(999999)
    .step(0.01, { message: "Complete amount must be a valid decimal" }),
  completeDate: z
    .string()
    .datetime({ message: "Complete date at must be a valid date string" }),
  budgetId: z.string({
    required_error: "Budget id is required",
    invalid_type_error: "Budget id needs to be a valid string",
  }),
  type,
};

export const GoalSchema = EntitySchema.extend(goalBase).strict();
type RawGoal = z.infer<typeof GoalSchema>;
export type Goal = RawGoal & WithObjectId;
export type GoalType = z.infer<typeof type>;
