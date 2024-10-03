import { Injectable } from "@nestjs/common";

import { User } from "src/shared/utils/prisma/generated/zod";

import PrismaService from "../prisma/prisma.service";

@Injectable()
export default class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUserByEmail(email: User["email"]): Promise<User | null> {
    const user = this.prismaService.user.findFirst({
      where: { email },
    });

    return user;
  }
}
