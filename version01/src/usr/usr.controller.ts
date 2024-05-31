import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsrService } from './usr.service';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';

@Controller('users')
export class UsrController {
  constructor(private readonly usrService: UsrService) {}

  @Post()
  create(@Body() createUsrDto: CreateUsrDto): CreateUsrDto {
    return this.usrService.create(createUsrDto);
  }

  @Get()
  find(@Query('id') id: string): Array<CreateUsrDto> | CreateUsrDto {
    if (id) {
      return this.usrService.findOne(id);
    } else {
      return this.usrService.findAll();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsrDto: UpdateUsrDto) {
    return this.usrService.update(id, updateUsrDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.usrService.remove(id);
  }
}
