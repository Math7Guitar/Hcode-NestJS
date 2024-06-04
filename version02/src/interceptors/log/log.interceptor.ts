import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(LogInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(tap(() => {
        const req = context.switchToHttp().getRequest();
        this.logger.log(`URL: ${req.url}`);
        this.logger.log(`METHOD: ${req.method}`);
        this.logger.log(`EXECUTION TIME: ${Date.now() - dt} miliseconds`);
      }),
    );
  }
}
