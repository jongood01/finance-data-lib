import { z } from "../deps.ts";

export const BaseModel = z.object({
  createdAt: z.date(),
  createdById: z.string(),
  createdByDisplayName: z.string(),
  deletedAt: z.date(),
  deletedById: z.string(),
  updatedAt: z.string(),
  updatedById: z.string(),
});
