import { z } from "../deps.ts";
import { userBase } from "../user/index.ts";

export const SignupRequestSchema = z.object(userBase);
export type SignupRequest = z.infer<typeof SignupRequestSchema>;
