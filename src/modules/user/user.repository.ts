import { Injectable } from "@nestjs/common";

import PrismaService from "src/modules/prisma/prisma.service";
import { User, UserSchema } from "src/shared/utils/prisma/generated/zod";

@Injectable()
export default class UserRepository {
  constructor(protected readonly prismaService: PrismaService) {}

  public async getAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return UserSchema.array().parse(users);
  }
}
