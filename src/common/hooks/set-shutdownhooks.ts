import type { INestApplication } from "@nestjs/common";

export default function setShutdownhooks(app: INestApplication) {
  app.enableShutdownHooks();
}
