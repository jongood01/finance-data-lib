import { z } from "../deps.ts";
import { CredentialsSchema } from "./credentials.schema.ts";

export type LoginResponse = {
  token: string;
};

export const LoginRequestSchema = CredentialsSchema;
export type LoginRequest = z.infer<typeof CredentialsSchema>;
