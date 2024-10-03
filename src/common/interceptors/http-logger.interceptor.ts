import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import type { FastifyReply, FastifyRequest } from "fastify";

import { type Observable, catchError, tap, throwError } from "rxjs";

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HTTPLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();
    const handle = next.handle();
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const response: FastifyReply = context.switchToHttp().getResponse();

    this.logger.log(
      `Request: method:[${request.method}] | from:[${request.ip}] to:[${request.hostname}${request.originalUrl}]`,
    );

    return handle.pipe(
      tap(() => {
        const delay = Date.now() - now;
        this.logger.log(
          `Response: code:[${response.statusCode}] | to:[${request.ip}] - over:[${delay}ms]`,
        );
      }),

      catchError((error: Error) => {
        const delay = Date.now() - now;
        this.logger.log(
          `ErrorResponse: code:[${response.statusCode}] | to:[${request.ip}] - over:[${delay}ms]`,
        );
        return throwError(() => error);
      }),
    );
  }
}
