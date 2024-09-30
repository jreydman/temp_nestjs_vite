import { Module } from "@nestjs/common";

import AppController from "src/modules/app/app.controller";
import AppService from "src/modules/app/app.service";
import ConfigModule from "src/modules/config/config.module";

import UserModule from "../user/user.module";

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
