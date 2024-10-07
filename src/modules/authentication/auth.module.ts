import { Module } from "@nestjs/common";

import PrismaModule from "../prisma/prisma.module";
import AuthEmailController from "./controllers/auth-email.controller";
import AuthService from "./services/auth.service";

@Module({
  imports: [PrismaModule],
  controllers: [AuthEmailController],
  providers: [AuthService],
  exports: [],
})
export default class AuthModule {}
