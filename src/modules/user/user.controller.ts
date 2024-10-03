import { ZodValidationPipe } from "@anatine/zod-nestjs";
import { Controller, UsePipes } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("user")
@UsePipes(ZodValidationPipe)
@Controller("user")
export default class UserController {}
