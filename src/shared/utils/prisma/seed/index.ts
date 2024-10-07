import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

import { UserCreateInputSchema } from "../generated/zod";

const prisma = new PrismaClient();

//--------------------------------------

type UserCreateInputType = z.infer<typeof UserCreateInputSchema>;

const user: UserCreateInputType = {
  username: process.env.TEST_USER_USERNAME!,
  email: process.env.TEST_USER_EMAIL!,
  roles: ["USER"],
  password: bcrypt.hashSync(process.env.TEST_USER_PASSWORD!, 3),
  emailVerification: {
    create: {
      status: "ACTIVE",
      token: null, // sets to null after user activate account
    },
  },
};

//--------------------------------------

const admin: UserCreateInputType = {
  username: process.env.TEST_ADMIN_USERNAME!,
  email: process.env.TEST_ADMIN_EMAIL!,
  roles: ["ADMIN"],
  password: bcrypt.hashSync(process.env.TEST_ADMIN_PASSWORD!, 3),
  emailVerification: {
    create: {
      status: "ACTIVE",
      token: null, // sets to null after user activate account
    },
  },
};

//--------------------------------------

async function bootstrap(): Promise<void> {
  const user_query_response = await prisma.user.create({ data: user });

  console.log(`---------QUERY FOR USER---------`, user_query_response, `\n------------------`);

  const admin_query_response = await prisma.user.create({ data: admin });

  console.log(`---------QUERY FOR ADMIN---------`, admin_query_response, `\n------------------`);
}

bootstrap();
