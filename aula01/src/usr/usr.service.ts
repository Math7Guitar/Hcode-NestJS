import { Injectable } from '@nestjs/common';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';

@Injectable()
export class UsrService {
  create(createUsrDto: CreateUsrDto): CreateUsrDto {
    return createUsrDto;
  }

  findAll() {
    return `This action returns all usr`;
  }

  findOne(id: string) {
    return `This action returns a #${id} usr`;
  }

  update(id: number, updateUsrDto: UpdateUsrDto): UpdateUsrDto {
    return updateUsrDto;
  }

  remove(id: string) {
    return `This action removes a #${id} usr`;
  }
}
