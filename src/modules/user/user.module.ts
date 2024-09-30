import { Module } from "@nestjs/common";

import PrismaModule from "../prisma/prisma.module";
import UserController from "./user.controller";
import UserRepository from "./user.repository";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserRepository],
  exports: [],
})
export default class UserModule {}
