import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { FastifyReply, FastifyRequest } from "fastify";

import UserRepository from "./user.repository";

@ApiTags("user")
@Controller("user")
export default class UserController {
  constructor(protected readonly userRepository: UserRepository) {}

  @Get()
  @ApiOkResponse({ status: HttpStatus.OK })
  public async getAll(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ): Promise<FastifyReply> {
    const users = await this.userRepository.getAll();
    return response.code(HttpStatus.OK).send(users);
  }
}
