import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsrModule } from './usr/usr.module';

@Module({
  imports: [UsrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
