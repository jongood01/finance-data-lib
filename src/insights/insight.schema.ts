import { EntitySchema, WithObjectId } from "../core/index.ts";
import { z } from "../deps.ts";

const insightBase = {
  title: z
    .string({
      required_error: "Insight title is required",
      invalid_type_error: "Insight title must be a string",
    })
    .min(5, { message: "Insight title must be at least 5 characters long" })
    .max(100, {
      message: "Insight title must be no longer than 100 characters long",
    }),
  description: z
    .string({
      required_error: "Insight description is required",
      invalid_type_error: "Insight description must be a string",
    })
    .min(5, {
      message: "Insight description must be at least 5 characters long",
    })
    .max(200, {
      message: "Insight description must be no longer than 200 characters long",
    }),
  actionPath: z
    .string({
      invalid_type_error: "Insight action label must be a string",
    })
    .nullable(),
  actionLabel: z
    .string({
      invalid_type_error: "Insight action label must be a string",
    })
    .nullable(),
  complete: z.boolean(),
  type: z.enum(["over-budget", "near-budget", "spending-change"]),
};

export const InsightSchema = EntitySchema.extend(insightBase).strict();
type RawInsight = z.infer<typeof InsightSchema>;
export type Insight = RawInsight & WithObjectId;
