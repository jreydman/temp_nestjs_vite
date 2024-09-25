import type { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";

import setGlobalPrefix from "src/common/hooks/set-global-prefix";
import setGlobalValidation from "src/common/hooks/set-global-validation";
import setSwagger from "src/common/hooks/set-swagger";
import setVersioning from "src/common/hooks/set-versioning";

import AppModule from "./modules/app/app.module";

async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
    }),
  );

  app.enableShutdownHooks();

  setVersioning(app);
  setGlobalPrefix(app);
  setGlobalValidation(app);
  setSwagger(app);

  return app;
}

export const viteNodeApp = await createApp();
