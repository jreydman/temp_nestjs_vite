import { Module } from "@nestjs/common";

import PrismaModule from "../prisma/prisma.module";
import AuthEmailController from "./auth-email.controller";
import AuthService from "./auth.service";

@Module({
  imports: [PrismaModule],
  controllers: [AuthEmailController],
  providers: [AuthService],
  exports: [],
})
export default class AuthModule {}
