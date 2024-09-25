import { type INestApplication, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export default function setVersioning(app: INestApplication) {
  const configService = app.get(ConfigService);

  const version = configService.get<string>("BACKEND_API_VERSION");

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: version,
  });
}
