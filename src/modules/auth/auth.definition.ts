import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

import { UserSchema } from "src/shared/utils/prisma/generated/zod";

export const AuthEmailControllerRoutePath = "auth/provider/email";

export enum AuthEmailControllerPaths {
  registerUserByEmail = "signup",
}

export const RegisterUserByEmailRequestSchema = UserSchema.pick({
  username: true,
  email: true,
  password: true,
});

export type RegisterUserByEmailRequestType = z.infer<typeof RegisterUserByEmailRequestSchema>;

export class RegisterUserByEmailRequestDto extends createZodDto(RegisterUserByEmailRequestSchema) {}
