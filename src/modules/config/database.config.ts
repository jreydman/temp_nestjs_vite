import { registerAs } from "@nestjs/config";
import { z } from "zod";

import { ConfigKey } from "./config.types";

const DatabaseConfigSchema = z.object({
  DATABASE_SERVICE_HOST: z.string(),
  DATABASE_SERVICE_PORT: z
    .string()
    .transform((value) => Number.parseInt(value, 10)),
  DATABASE_PROVIDER: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
});

export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;

const DatabaseConfigRegistry = registerAs(ConfigKey.Database, () => {
  const environment = DatabaseConfigSchema.safeParse(process.env);

  if (!environment.success) {
    console.error(
      "❌ Invalid environment variables:",
      environment.error.format(),
    );
    throw new Error("Invalid environment variables");
  }

  const parsedEnvironment = environment.data;

  return parsedEnvironment;
});

export default DatabaseConfigRegistry;
