import { z } from "../deps.ts";
import { userBase } from "../user/user.schema.ts";

const { email, password } = userBase;
const credentialsBase = { email, password };

export const CredentialsSchema = z.object(credentialsBase);
export type Credentials = z.infer<typeof CredentialsSchema>;
