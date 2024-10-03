import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export default class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(protected readonly configService: ConfigService) {
    super({
      log:
        configService.get<String>("NODE_ENV") === "development"
          ? [
              { emit: "event", level: "query" },
              { emit: "event", level: "error" },
              { emit: "event", level: "info" },
              { emit: "event", level: "warn" },
            ]
          : [{ emit: "event", level: "error" }],
    });
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
