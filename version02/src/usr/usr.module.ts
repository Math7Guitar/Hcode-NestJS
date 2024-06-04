import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UsrService } from './usr.service';
import { UsrController } from './usr.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsrIdCheckMiddleware } from 'src/middlewares/usr-id-check/usr-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UsrController],
  providers: [UsrService],
  exports: [UsrService],
})
export class UsrModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsrIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
