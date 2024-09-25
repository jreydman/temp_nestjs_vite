import { Injectable } from "@nestjs/common";

import PrismaService from "src/modules/prisma/prisma.service";

Injectable();
export default class UserRepository {
  constructor(protected readonly prismaService: PrismaService) {}
}
