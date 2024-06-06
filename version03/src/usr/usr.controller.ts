import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsrService } from './usr.service';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';
import { User } from './entities/usr.entity';
import { Id } from 'src/decorators/id/id.decorator';
import { Role } from 'src/decorators/role/role.decorator';
import { Roles } from 'src/enum/roles.enum';
import { RoleGuard } from 'src/guards/role/role.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
// import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(AuthGuard, RoleGuard)
// @UseInterceptors(LogInterceptor)
@Controller('users')
export class UsrController {
  constructor(private readonly usrService: UsrService) {}

  // @UseGuards(ThrottlerGuard)
  // @UseInterceptors(LogInterceptor)
  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Role(Roles.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUsrDto: CreateUsrDto): Promise<User> {
    return this.usrService.create(createUsrDto);
  }

  @SkipThrottle()
  @HttpCode(HttpStatus.FOUND)
  @Get()
  find(@Query('id') id: string): Promise<Array<User>> | Promise<User> {
    if (id) {
      return this.usrService.findOne(id);
    } else {
      return this.usrService.findAll();
    }
  }

  @Role(Roles.ADMIN)
  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  update(@Param('id') id: string, @Body() updateUsrDto: UpdateUsrDto): Promise<User> {
    return this.usrService.update(id, updateUsrDto);
  }

  @Role(Roles.ADMIN)
  @Delete(':id')
  remove(@Id() id: string): Promise<User> {
    console.log(id);
    return this.usrService.remove(id);
  }
}
