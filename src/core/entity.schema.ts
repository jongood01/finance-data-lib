import { z } from "../deps.ts";

export const EntitySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  createdById: z.string().nullable(),
  createdByDisplayName: z.string().nullable(),
  deletedAt: z.date().nullable(),
  deletedById: z.string().nullable(),
  updatedAt: z.date(),
  updatedById: z.string().nullable(),
});

// We use the any type here as it will only be used for Mongodb ids
export type WithObjectId = { _id: any };
export type CreatedByUserInfo = { id: string; name: string };
