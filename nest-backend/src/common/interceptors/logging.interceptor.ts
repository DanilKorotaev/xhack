import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const url = context.switchToHttp().getRequest().originalUrl;
    console.log(`call ${url}`);
    const now = Date.now();
    console.log()
    return next
      .handle()
      .pipe(
        tap(() => console.log(`${url} ${Date.now() - now}ms`)),
      );
  }
}
