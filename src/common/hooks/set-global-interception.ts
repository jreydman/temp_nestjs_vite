import type { INestApplication } from "@nestjs/common";

import AllowCorsInterceptor from "src/common/interceptors/allow-cors.interceptor";

import { HTTPLoggingInterceptor } from "../interceptors/http-logger.interceptor";

export default function setGlobalInterception(app: INestApplication) {
  const interceptors = [
    new AllowCorsInterceptor(),
    new HTTPLoggingInterceptor(),
  ];

  app.useGlobalInterceptors(...interceptors);
}
