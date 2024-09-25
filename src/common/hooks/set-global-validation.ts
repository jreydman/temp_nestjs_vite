import type { INestApplication } from "@nestjs/common";

export default function setGlobalValidation(app: INestApplication) {
  app.useGlobalPipes(/** validation here */);
}
