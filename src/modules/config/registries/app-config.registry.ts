import { registerAs } from "@nestjs/config";
import { z } from "zod";

import { NODE_ENV_VALUES } from "src/shared/types/config.definition";

import { ConfigKeys } from "../config.definition";

const AppConfigSchema = z.object({
  NODE_ENV: z.nativeEnum(NODE_ENV_VALUES).default(NODE_ENV_VALUES.DEVELOPMENT),

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

export type AppConfigType = z.infer<typeof AppConfigSchema>;

const AppConfigRegistry = registerAs(ConfigKeys.App, () => {
  const environment = AppConfigSchema.safeParse(process.env);

  if (!environment.success) {
    console.error("❌ Invalid environment variables:", environment.error.format());
    throw new Error("Invalid environment variables");
  }

  const parsedEnvironment = environment.data;

  return parsedEnvironment;
});

export default AppConfigRegistry;
