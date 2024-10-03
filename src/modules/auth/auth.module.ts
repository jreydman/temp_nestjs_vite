import { Module } from "@nestjs/common";

import PrismaModule from "../prisma/prisma.module";
import AuthEmailController from "./auth-email.controller";

@Module({
  imports: [PrismaModule],
  controllers: [AuthEmailController],
  providers: [],
  exports: [],
})
export default class AuthModule {}
