import type { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export default function setGlobalPrefix(app: INestApplication) {
  const configService = app.get(ConfigService);

  const prefix = configService.get<string>("BACKEND_API_PREFIX");

  if (prefix) app.setGlobalPrefix(prefix);
}
