import { Global, Module } from "@nestjs/common";

import NestConsoleLogger from "./nest-console.logger";

@Global()
@Module({
  imports: [],
  providers: [NestConsoleLogger],
  controllers: [],
  exports: [NestConsoleLogger],
})
export default class LoggerModule {}
