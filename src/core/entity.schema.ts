import { z } from "../deps.ts";

export const EntitySchema = z.object({
  createdAt: z.date(),
  createdById: z.string().nullable(),
  createdByDisplayName: z.string().nullable(),
  deletedAt: z.date().nullable(),
  deletedById: z.string().nullable(),
  updatedAt: z.string(),
  updatedById: z.string().nullable(),
});
