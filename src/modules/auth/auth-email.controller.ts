import { ZodValidationPipe } from "@anatine/zod-nestjs";
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import type { FastifyReply } from "fastify";

import PrismaService from "../prisma/prisma.service";
import { RegisterUserByEmailRequestDto } from "./auth.types";

const AUTH_EMAIL_TAG = "auth/provider/email";

@ApiTags(AUTH_EMAIL_TAG)
@UsePipes(ZodValidationPipe)
@Controller(AUTH_EMAIL_TAG)
export default class AuthEmailController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @ApiCreatedResponse({
    description: "User has been successfully created.",
  })
  public async registerUserByEmail(
    @Body() createUserDto: RegisterUserByEmailRequestDto,
    @Res() response: FastifyReply,
  ): Promise<FastifyReply> {
    return response.code(HttpStatus.CREATED).send();
  }
}
