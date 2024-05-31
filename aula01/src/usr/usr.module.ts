import { Module } from '@nestjs/common';
import { UsrService } from './usr.service';
import { UsrController } from './usr.controller';

@Module({
  controllers: [UsrController],
  providers: [UsrService],
})
export class UsrModule {}
