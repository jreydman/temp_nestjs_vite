import { registerAs } from "@nestjs/config";
import { z } from "zod";

import { ConfigKeys } from "../config.definition";

const JWTConfigSchema = z.object({
  JWT_ACCESS_SECRET_KEY: z.string(),
  JWT_ACCESS_SECRET_EXPIRATION_TIME: z.string(),
  JWT_REFRESH_SECRET_KEY: z.string(),
  JWT_REFRESH_SECRET_EXPIRATION_TIME: z.string(),
});

export type JWTConfigType = z.infer<typeof JWTConfigSchema>;

const JWTConfigRegistry = registerAs(ConfigKeys.JWT, () => {
  const environment = JWTConfigSchema.safeParse(process.env);

  if (!environment.success) {
    console.error("❌ Invalid environment variables:", environment.error.format());
    throw new Error("Invalid environment variables");
  }

  const parsedEnvironment = environment.data;

  return parsedEnvironment;
});

export default JWTConfigRegistry;
