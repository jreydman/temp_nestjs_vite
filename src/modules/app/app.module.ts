import { Module } from "@nestjs/common";

import AppController from "src/modules/app/app.controller";
import AppService from "src/modules/app/app.service";
import ConfigModule from "src/modules/config/config.module";

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
