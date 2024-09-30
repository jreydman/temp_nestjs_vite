import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { FastifyReply, FastifyRequest } from "fastify";

import AppService from "./app.service";

@ApiTags("root")
@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ status: HttpStatus.OK, type: String })
  public async getHello(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ): Promise<void> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        response.code(HttpStatus.BAD_GATEWAY).send(this.appService.getHello());

        resolve();
      }, 5000),
    );
  }
}
