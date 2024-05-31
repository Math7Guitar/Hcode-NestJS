import { Injectable, Logger } from '@nestjs/common';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';

@Injectable()
export class UsrService {
  private readonly logger: Logger = new Logger(UsrService.name);

  private users: Array<CreateUsrDto> = [];

  create(createUsrDto: CreateUsrDto): CreateUsrDto {
    this.logger.log('Create User Method Accessed!');
    this.users.push(createUsrDto);
    return createUsrDto;
  }

  findAll(): Array<CreateUsrDto> {
    this.logger.log('Get User List Method Accessed!');
    return this.users;
  }

  findOne(id: string): CreateUsrDto {
    this.logger.log('Find User Method Accessed!');
    // eslint-disable-next-line prettier/prettier
    return this.users.filter(usr => usr.id === id)[0];
  }

  update(id: string, updateUsrDto: UpdateUsrDto): UpdateUsrDto {
    this.logger.log('Update User Method Accessed!');
    const usr: CreateUsrDto = this.findOne(id);

    usr.id = updateUsrDto.id;
    usr.name = updateUsrDto.name;
    usr.username = updateUsrDto.username;
    usr.password = updateUsrDto.password;

    const index = this.users.indexOf(usr);
    this.users.splice(index, 1, usr);
    return updateUsrDto;
  }

  remove(id: string) {
    this.logger.log('Delete User Method Accessed!');
    // eslint-disable-next-line prettier/prettier
    const index = this.users.indexOf(this.users.filter((usr) => usr.id === id)[0]);
    this.users.splice(index, 1);
    return `User id: ${id}, successfully deleted`;
  }
}
