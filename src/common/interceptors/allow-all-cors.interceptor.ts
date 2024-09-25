import {
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
  RequestMethod,
} from "@nestjs/common";
import type { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    cors?: boolean;
  }
}

export class AllowAllCorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const handle = next.handle();
    const request = context.switchToHttp().getRequest();
    const response: FastifyReply<any> = context.switchToHttp().getResponse();

    const allowedMethods = [
      RequestMethod.GET,
      RequestMethod.HEAD,
      RequestMethod.PUT,
      RequestMethod.PATCH,
      RequestMethod.POST,
      RequestMethod.DELETE,
    ];

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

    response.headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": allowedHeaders.join(","),
      "Access-Control-Allow-Methods": allowedMethods.join(","),
      "Access-Control-Max-Age": "86400",
    });

    request.cors = true;

    return handle;
  }
}
