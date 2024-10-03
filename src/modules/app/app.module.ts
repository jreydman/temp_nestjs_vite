import { Module } from "@nestjs/common";

import ConfigModule from "src/modules/config/config.module";

import AuthModule from "../auth/auth.module";
import UserModule from "../user/user.module";

@Module({
  imports: [ConfigModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export default class AppModule {}
