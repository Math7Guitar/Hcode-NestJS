/* eslint-disable prettier/prettier */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usr } from './entities/usr.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsrService {
  private readonly logger: Logger = new Logger(UsrService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createUsrDto: CreateUsrDto): Promise<Usr> {
    createUsrDto.password = await bcrypt.hash(createUsrDto.password, await bcrypt.genSalt());

    const usr = this.prisma.usr.create({
      data: createUsrDto,
    });

    return usr;
  }

  async findAll(): Promise<Array<Usr>> {
    return this.prisma.usr.findMany();
  }

  async findOne(id: string): Promise<Usr> {
    // eslint-disable-next-line prettier/prettier
    return this.prisma.usr.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUsrDto: UpdateUsrDto): Promise<Usr> {
    if (!this.exists) {
      throw new NotFoundException('User not found!');
    }

    updateUsrDto.password = await bcrypt.hash(updateUsrDto.password, await bcrypt.genSalt());

    if (updateUsrDto.birthAt) {
      return this.prisma.usr.update({
        data: { ...updateUsrDto, birthAt: new Date(updateUsrDto.birthAt) },
        where: { id },
      });
    } else {
      return this.prisma.usr.update({
        data: updateUsrDto,
        where: { id },
      });
    }
  }

  async remove(id: string): Promise<Usr> {

    if (await this.findOne(id)) {
      return this.prisma.usr.delete({
        where: { id },
      });
    } else {
      throw new NotFoundException('User not found.');
    }
  }

  exists(id: string) {
    return this.prisma.usr.count({ where: { id } })
  }
}
