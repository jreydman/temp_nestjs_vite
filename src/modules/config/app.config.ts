import { registerAs } from "@nestjs/config";
import { z } from "zod";

import { ConfigKey } from "./config.types";

const AppConfigSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  BACKEND_SERVICE_HOST: z.string().transform(String).default("localhost"),

  BACKEND_SERVICE_PORT: z
    .union([z.string(), z.number()])
    .transform((value) => {
      const port = Number(value);
      if (Number.isNaN(port)) {
        throw new TypeError("Port must be a valid number");
      }
      return port;
    })
    .default(3000),

  BACKEND_API_VERSION: z.string().regex(/^\d+$/, {
    message: "API version must follow the pattern {number}",
  }),

  BACKEND_API_PREFIX: z.string().optional(),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

const AppConfigRegistry = registerAs(ConfigKey.App, () => {
  const environment = AppConfigSchema.safeParse(process.env);

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

export default AppConfigRegistry;
