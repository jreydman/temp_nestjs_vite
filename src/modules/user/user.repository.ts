import { Injectable } from "@nestjs/common";
import type { User } from "@prisma/client";

import PrismaService from "src/modules/prisma/prisma.service";

@Injectable()
export default class UserRepository {
  constructor(protected readonly prismaService: PrismaService) {}

  public async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
}
