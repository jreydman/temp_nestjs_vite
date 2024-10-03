import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import type { FastifyReply, FastifyRequest } from "fastify";
import { inspect } from "util";

import { type Observable, catchError, tap, throwError } from "rxjs";

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HTTPLoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<unknown> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request: FastifyRequest = httpContext.getRequest();
    const response: FastifyReply = httpContext.getResponse();

    this.logger.log(
      `Request: method:[${request.method}] | from:[${request.ip}] to:[${request.hostname}${request.originalUrl}]\n-------body--------\n${inspect(request.body)}\n-------------------`,
    );

    return next.handle().pipe(
      tap((responseBody) => {
        const delay = Date.now() - now;
        this.logger.log(
          `Response: code:[${response.statusCode}] | to:[${request.ip}] - over:[${delay}ms]\n-------body--------\n${inspect(responseBody)}\n-------------------`,
        );
      }),

      catchError((error: Error) => {
        const statusCode =
          error instanceof HttpException ? error.getStatus() : 500;
        const delay = Date.now() - now;
        this.logger.log(
          `ErrorResponse: code:[${statusCode}] | to:[${request.ip}] - over:[${delay}ms]\n-------Info--------\n${inspect(error.message)}\n-------------------`,
        );
        return throwError(() => error);
      }),
    );
  }
}
