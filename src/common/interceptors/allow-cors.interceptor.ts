import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
  RequestMethod,
} from "@nestjs/common";
import type { FastifyReply, FastifyRequest } from "fastify";

import type { Observable } from "rxjs";

declare module "fastify" {
  interface FastifyRequest {
    cors?: boolean;
  }
}

@Injectable()
export default class AllowCorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const handle = next.handle();
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const response: FastifyReply = context.switchToHttp().getResponse();

    const allowedOrigins = ["http://localhost:3001"];

    const allowedHeaders = [
      "Authorization",
      "Origin",
      "No-Cache",
      "X-Requested-With",
      "If-Modified-Since",
      "Last-Modified",
      "Cache-Control",
      "Expires",
      "Content-Type",
    ];

    const allowedMethods = [
      RequestMethod.GET,
      RequestMethod.HEAD,
      RequestMethod.PUT,
      RequestMethod.PATCH,
      RequestMethod.POST,
      RequestMethod.DELETE,
    ];

    response.headers({
      "Access-Control-Allow-Origin": allowedOrigins.join(","),
      "Access-Control-Allow-Headers": allowedHeaders.join(","),
      "Access-Control-Allow-Methods": allowedMethods.join(","),
      "Access-Control-Max-Age": "86400",
    });

    request.cors = true;

    return handle;
  }
}
