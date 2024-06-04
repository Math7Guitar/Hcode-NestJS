import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
// import { AuthMeDTO } from './dto/auth-me.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Usr } from 'src/decorators/usr/usr.decorator';
// import { AuthResetDTO } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.service.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.service.register(body);
  }

  @Post('forget')
  async forget(@Body() body: AuthForgetDTO) {
    return this.service.forget(body.email);
  }

  // @Post('reset')
  // async reset(@Body() body: AuthResetDTO) {
  //   return this.service.reset(body.password, body.token);
  // }

  // Me - V1
  // @Post('me')
  // async me(@Headers('authorization') token) {
  //   return this.service.checkToken((token ?? '').split(' ')[1]);
  // }

  // Me - V2
  // @UseGuards(AuthGuard)
  // @Post('me')
  // async me(@Headers('authorization') token) {
  //   return this.service.checkToken((token ?? '').split(' ')[1]);
  // }

  // Me - V3
  // @UseGuards(AuthGuard)
  // @Post('me')
  // async me(@Req() req) {
  //   return { me: 'ok', data: req.tokenPayload, user: req.user };
  // }

  // Me - V4
  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Usr('email') user) {
    return { user };
  }
}
