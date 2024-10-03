import { ZodValidationPipe } from "@anatine/zod-nestjs";
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Logger, Post, UsePipes } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import bcrypt from "bcrypt";

import PrismaService from "../prisma/prisma.service";
import {
  AuthEmailControllerPaths,
  AuthEmailControllerRoutePath,
  RegisterUserByEmailRequestDto,
} from "./auth.definition";

@ApiTags(AuthEmailControllerRoutePath)
@UsePipes(ZodValidationPipe)
@Controller(AuthEmailControllerRoutePath)
export default class AuthEmailController {
  private readonly logger = new Logger(AuthEmailController.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Post(AuthEmailControllerPaths.registerUserByEmail)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    type: BadRequestException,
    example: new BadRequestException({ errors: ["username already in use"] }),
  })
  public async registerUserByEmail(@Body() createUserDto: RegisterUserByEmailRequestDto) {
    let isError = false;
    const errors = [];

    if (Boolean(await this.prismaService.user.findFirst({ where: { email: createUserDto.email } }))) {
      isError = true;
      errors.push("email already in use");
    }

    if (Boolean(await this.prismaService.user.findFirst({ where: { username: createUserDto.username } }))) {
      isError = true;
      errors.push("username already in use");
    }

    if (isError) throw new BadRequestException({ errors });

    const user = await this.prismaService.user.create({
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

    // const response = user;

    // return response;
  }
}
