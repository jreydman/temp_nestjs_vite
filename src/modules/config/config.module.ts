import { ConfigModule as NestConfigModule } from "@nestjs/config";

import AppConfigRegistry from "./registries/app-config.registry";
import DatabaseConfigRegistry from "./registries/database-config.registry";
import JWTConfigRegistry from "./registries/jwt-config.registry";

const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  load: [AppConfigRegistry, DatabaseConfigRegistry, JWTConfigRegistry],
});

export default ConfigModule;
