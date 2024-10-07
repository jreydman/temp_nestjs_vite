import type { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";

import setGlobalPrefix from "src/common/hooks/set-global-prefix";
import setGlobalValidation from "src/common/hooks/set-global-validation";
import setSwagger from "src/common/hooks/set-swagger";
import setVersioning from "src/common/hooks/set-versioning";

import setGlobalInterception from "./common/hooks/set-global-interception";
import setShutdownhooks from "./common/hooks/set-shutdownhooks";
import AppModule from "./modules/app/app.module";

async function createApp(): Promise<INestApplication> {
  const adapter = new FastifyAdapter({
    trustProxy: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

  setShutdownhooks(app);
  setVersioning(app);
  setGlobalPrefix(app);
  setGlobalValidation(app);
  setSwagger(app);
  setGlobalInterception(app);

  return app;
}

export const viteNodeApp = await createApp();
