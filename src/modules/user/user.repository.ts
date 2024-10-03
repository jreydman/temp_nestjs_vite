import { Injectable } from "@nestjs/common";
import { User as _User } from "@prisma/client";

import PrismaService from "src/modules/prisma/prisma.service";
import { User, UserSchema } from "src/shared/utils/prisma/generated/zod";

@Injectable()
export default class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll(): Promise<User[]> {
    const users: _User[] = await this.prismaService.user.findMany();
    return UserSchema.array().parse(users);
  }
}
