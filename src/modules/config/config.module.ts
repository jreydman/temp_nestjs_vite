import { ConfigModule as NestConfigModule } from "@nestjs/config";

import AppConfigRegistry from "./app.config";
import DatabaseConfigRegistry from "./database.config";
import JWTConfigRegistry from "./jwt.config";

const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  load: [AppConfigRegistry, DatabaseConfigRegistry, JWTConfigRegistry],
});

export default ConfigModule;
