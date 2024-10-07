import { Module } from "@nestjs/common";

import ConfigModule from "src/modules/config/config.module";

import AuthModule from "../authentication/auth.module";
import LoggerModule from "../logger/logger.module";
import UserModule from "../user/user.module";

@Module({
  imports: [ConfigModule, LoggerModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
