import { Injectable } from "@nestjs/common";

import PrismaService from "src/modules/prisma/services/prisma.service";
import { User } from "src/shared/utils/prisma/generated/zod";

@Injectable()
export default class AuthService {
  constructor(private readonly _prismaService: PrismaService) {}

  public async getUserByEmail(email: User["email"]): Promise<User | null> {
    const user = this._prismaService.user.findFirst({
      where: { email },
    });

    return user;
  }
}
