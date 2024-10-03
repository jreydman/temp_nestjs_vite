import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { Observable } from "rxjs";

function isDateString(date: unknown): boolean {
  return typeof date === "string" && !isNaN(Date.parse(date));
}

@Injectable()
export class DateParseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = this.transformDates(request.body); // Преобразование дат в теле запроса
    return next.handle();
  }

  private transformDates(obj: any): unknown {
    if (typeof obj !== "object" || obj === null) {
      return obj; // Прекратить если это не объект
    }

    // Рекурсивно проходим по объектам и массивам
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      // Если это строка и она выглядит как дата — преобразовать в объект Date
      if (typeof value === "string" && isDateString(value)) {
        obj[key] = new Date(value);
      } else if (typeof value === "object" && value !== null) {
        // Рекурсивно проходим по вложенным объектам и массивам
        obj[key] = this.transformDates(value);
      }
    });

    return obj;
  }
}
