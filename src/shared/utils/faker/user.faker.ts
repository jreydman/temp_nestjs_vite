import { faker } from "@faker-js/faker";

import { RegisterUserByEmailRequestType } from "src/modules/auth/auth.definition";

export function genRegisterUserByEmailRequestData(): RegisterUserByEmailRequestType {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
