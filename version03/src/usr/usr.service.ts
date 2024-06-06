/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';
import { User } from './entities/usr.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsrService {
  private readonly logger: Logger = new Logger(UsrService.name);

  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(createUsrDto: CreateUsrDto): Promise<User> {
    if (await this.repo.exists({ where: {email: createUsrDto.email} })) {
      throw new BadRequestException('E-mail already used.');
    }

    createUsrDto.password = await bcrypt.hash(createUsrDto.password, await bcrypt.genSalt());

    const usr = this.repo.create(createUsrDto);

    return this.repo.save(usr);
  }

  async findAll(): Promise<Array<User>> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<User> {
    // eslint-disable-next-line prettier/prettier
    return this.repo.findOne({
      where: { id },
    });
  }

  async update(id: string, updateUsrDto: UpdateUsrDto): Promise<User> {
    this.exists(id);

    updateUsrDto.password = await bcrypt.hash(updateUsrDto.password, await bcrypt.genSalt());

    if (updateUsrDto.birthAt) {
      await this.repo.update(id, { ...updateUsrDto, birthAt: new Date(updateUsrDto.birthAt) });
      return this.findOne(id);
    } else {
      await this.repo.update(id, updateUsrDto);
      return this.findOne(id);
    }
  }

  async remove(id: string): Promise<User> {

    if (await this.findOne(id)) {
      await this.repo.delete(id);
      return this.findOne(id);
    } else {
      throw new NotFoundException('User not found.');
    }
  }

  async exists(id: string) {
    if (!(await this.repo.exists({ where: { id } }))) {
      throw new NotFoundException('User not found!');
    }
  }
}
