import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma, PrismaClient } from "@prisma/client";

import NestConsoleLogger from "src/modules/logger/nest-console.logger";
import { NODE_ENV_VALUES, PROCESS_ENV_KEYS } from "src/shared/types/config.definition";

@Injectable()
export default class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  // private readonly logger = new Logger(PrismaService.name);

  constructor(
    private readonly _configService: ConfigService,
    private readonly logger: NestConsoleLogger,
  ) {
    logger.setContext(PrismaService.name);

    const nodeEnv = _configService.get<string>(PROCESS_ENV_KEYS.NODE_ENV);

    const logPool: Prisma.LogDefinition[] = [{ emit: "event", level: "error" }];
    if (nodeEnv !== NODE_ENV_VALUES.PRODUCTION) {
      logPool.push(
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
      );
    }

    super({ log: logPool });
  }
  onModuleInit() {
    this.$connect();

    this.$on("error", ({ message }) => {
      this.logger.error(message);
    });
    this.$on("warn", ({ message }) => {
      this.logger.warn(message);
    });
    this.$on("info", ({ message }) => {
      this.logger.debug(message);
    });
    this.$on("query", ({ query, params }) => {
      this.logger.log(`${query}; ${params}`);
    });
  }
  onModuleDestroy() {
    this.$disconnect();
  }
}
