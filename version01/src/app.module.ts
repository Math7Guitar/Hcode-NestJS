import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsrModule } from './usr/usr.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UsrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
