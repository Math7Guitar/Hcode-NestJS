import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/usr/entities/usr.entity';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UsrService } from 'src/usr/usr.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly usrService: UsrService,
    private readonly mailer: MailerService,
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  createToken(usr: User) {
    return {
      accessToken: this.jwt.sign(
        {
          name: usr.name,
          email: usr.email,
        },
        {
          expiresIn: '2 min',
          subject: String(usr.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      return this.jwt.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  isValidToken(token: string): boolean {
    try {
      this.checkToken(token);
      return true;
    } catch (err) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const usr = await this.repo.findOne({
      where: { email },
    });

    if (!usr) {
      throw new UnauthorizedException('Incorrect e-mail &/or password.');
    }

    if (!(await bcrypt.compare(password, usr.password))) {
      throw new UnauthorizedException('Incorrect e-mail &/or password.');
    }

    return this.createToken(usr);
  }

  async forget(email: string): Promise<boolean> {
    const usr = await this.repo.findOne({
      where: {
        email,
      },
    });

    if (!usr) {
      throw new UnauthorizedException('Incorrect e-mail.');
    }

    const token = this.jwt.sign(
      {
        email: usr.email,
      },
      {
        expiresIn: '2 min',
        subject: String(usr.id),
        issuer: 'forget',
        audience: 'users',
      },
    );

    await this.mailer.sendMail({
      subject: 'Password recover',
      to: process.env.TO,
      template: 'forget',
      context: {
        name: usr.name,
        token,
      },
    });

    return true;
  }

  async reset(password: string, token: string) {
    try {
      const data = this.jwt.verify(token, {
        audience: 'users',
        issuer: 'forget',
      });

      password = await bcrypt.hash(password, await bcrypt.genSalt());

      await this.repo.update(data.sub, { password });

      const usr = await this.usrService.findOne(data.dub);

      return this.createToken(usr);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async register(data: AuthRegisterDTO) {
    const usr = await this.usrService.create(data);

    return this.createToken(usr);
  }
}
