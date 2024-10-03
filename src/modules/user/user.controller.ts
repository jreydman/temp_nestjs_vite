import { ZodValidationPipe, createZodDto } from "@anatine/zod-nestjs";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { FastifyReply, FastifyRequest } from "fastify";

import { User, UserSchema } from "src/shared/utils/prisma/generated/zod";

import UserRepository from "./user.repository";

export class CreateUserRequestDto extends createZodDto(UserSchema) {}
export class CreatedUserResponseDto extends createZodDto(UserSchema) {}

@ApiTags("user")
@UsePipes(ZodValidationPipe)
@Controller("user")
export default class UserController {
  constructor(protected readonly userRepository: UserRepository) {}

  @Post()
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: CreatedUserResponseDto,
  })
  async create(
    @Body() createUserDto: CreateUserRequestDto,
    @Res() response: FastifyReply,
  ): Promise<FastifyReply> {
    return response.code(HttpStatus.CREATED).send({});
  }

  @Get()
  @ApiOkResponse({ status: HttpStatus.OK })
  public async getAll(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ): Promise<FastifyReply> {
    const users: User[] = await this.userRepository.getAll();
    return response.code(HttpStatus.OK).send(users);
  }
}
