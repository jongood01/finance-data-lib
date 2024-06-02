import { EntitySchema, WithObjectId } from "../core/index.ts";
import { z } from "../deps.ts";

const type = z.enum([
  "save-amount",
  "save-target",
  "spend-amount",
  "spend-target",
]);
const amountType = z.enum(["$", "%"]);

const goalExternalBase = {
  amount: z
    .number()
    .nonnegative()
    .max(999999)
    .step(0.01, { message: "Amount must be a valid decimal" }),
  amountType,
  goalDate: z
    .string()
    .datetime({ message: "Goal date at must be a valid date string" }),
  budgetId: z
    .string({
      required_error: "Budget id is required",
      invalid_type_error: "Budget id needs to be a valid string",
    })
    .nullable(),
  type,
};

const goalBase = {
  ...goalExternalBase,
  goalDate: z.date({
    required_error: "Goal date must be a valid date",
  }),
  complete: z.boolean(),
  completeAmount: z
    .number()
    .nonnegative()
    .max(999999)
    .step(0.01, { message: "Complete amount must be a valid decimal" })
    .nullable(),
  completeDate: z
    .date({ required_error: "Complete date at must be a valid date" })
    .nullable(),
};

export const GoalSchema = EntitySchema.extend(goalBase).strict();
export const GoalBaseSchema = z.object(goalExternalBase).strict();
export const CreateGoalRequestSchema = z.object(goalExternalBase).strict();
export const UpdateGoalRequestSchema = z
  .object({
    ...goalExternalBase,
    id: z.string({
      required_error: "Goal id is required",
      invalid_type_error: "Goal id must be a string",
    }),
  })
  .strict();
type RawGoal = z.infer<typeof GoalSchema>;
export type Goal = RawGoal & WithObjectId;
export type GoalType = z.infer<typeof type>;
export type GoalBase = z.infer<typeof GoalBaseSchema>;
export type CreateGoalRequest = z.infer<typeof CreateGoalRequestSchema>;
export type UpdateGoalRequest = z.infer<typeof UpdateGoalRequestSchema>;
