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
    const { method, originalUrl } = request;

    return handle.pipe(
      tap(() => {
        const delay = Date.now() - now;
        this.logger.log(
          `${response.statusCode} | [${method}] ${originalUrl} - ${delay}ms`,
        );
      }),

      catchError((error: Error) => {
        const delay = Date.now() - now;
        this.logger.log(
          `${response.statusCode} | [${method}] ${originalUrl} - ${delay}ms`,
        );
        return throwError(() => error);
      }),
    );
  }
}
