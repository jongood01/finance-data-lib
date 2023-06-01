import { z } from "../deps.ts";
import { userBase } from "../user/index.ts";

export const SignupRequestSchema = z.object(userBase).strict();
export type SignupRequest = z.infer<typeof SignupRequestSchema>;
