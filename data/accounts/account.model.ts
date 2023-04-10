import { z } from "~deps";

export const AccountModel = z.object({
  name: z.string().min(5).max(100),
  type: z.enum(["Chequing", "Savings", "Credit Card", "Mortgage"]),
  createdAt: z.date(),
});

export type Account = z.infer<typeof AccountModel>;
