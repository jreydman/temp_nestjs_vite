import { ZodValidationPipe } from "@anatine/zod-nestjs";
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import bcrypt from "bcrypt";

import NestConsoleLogger from "src/modules/logger/nest-console.logger";

import PrismaService from "../../prisma/services/prisma.service";
import {
  AuthEmailControllerPaths,
  AuthEmailControllerRoutePath,
  RegisterUserByEmailRequestDto,
} from "../auth.definition";
import UserAlredyExistException from "../exceptions/user-already-exist.exception";

@ApiTags(AuthEmailControllerRoutePath)
@UsePipes(ZodValidationPipe)
@Controller(AuthEmailControllerRoutePath)
export default class AuthEmailController {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _logger: NestConsoleLogger,
  ) {
    _logger.setContext(AuthEmailController.name);
  }
  //---------------------------------------------------------
  @Post(AuthEmailControllerPaths.registerUserByEmail)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: "Successfully created user" })
  @ApiBadRequestResponse({
    type: UserAlredyExistException,
    description: "User with that credentials already exists",
  })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  public async registerUserByEmail(@Body() createUserDto: RegisterUserByEmailRequestDto) {
    let isError = false;
    const errors = [];

    if (Boolean(await this._prismaService.user.findFirst({ where: { email: createUserDto.email } }))) {
      isError = true;
      errors.push("email already in use");
    }

    if (Boolean(await this._prismaService.user.findFirst({ where: { username: createUserDto.username } }))) {
      isError = true;
      errors.push("username already in use");
    }

    if (isError) return new UserAlredyExistException(errors);

    await this._prismaService.user.create({
      omit: { password: true, lastLoginIp: true },
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: bcrypt.hashSync(createUserDto.password, 3),
        roles: ["USER"],
        emailVerification: {
          create: {
            status: "PENDING",
            token: bcrypt.hashSync(String(createUserDto.email + createUserDto.username), 3),
          },
        },
      },
    });
    return;
  }
  //---------------------------------------------------------
}
