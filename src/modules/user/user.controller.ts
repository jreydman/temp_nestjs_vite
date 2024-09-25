import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";

@Controller("user")
export default class UserController {
  @Get()
  public async getUsers(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const f = 1;
        console.log(f);
        console.log(request.ip);
        response.code(HttpStatus.OK).send([]);

        resolve();
      }, 5000),
    );
  }
}
