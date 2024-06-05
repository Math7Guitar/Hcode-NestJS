import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
// import { AuthMeDTO } from './dto/auth-me.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Usr } from 'src/decorators/usr/usr.decorator';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { FilesService } from 'src/files/files.service';
import { join } from 'path';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly filesService: FilesService,
  ) {}

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

  @Post('reset')
  async reset(@Body() body: AuthResetDTO) {
    return this.service.reset(body.password, body.token);
  }

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

  @UseInterceptors(FileInterceptor('photo'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(@Usr() user, @UploadedFile() photo: Express.Multer.File) {
    // eslint-disable-next-line prettier/prettier
    const path = join(__dirname, '..', '..', 'src', 'storage', 'photos', `photo-${ user.id }.png`);

    try {
      await this.filesService.uploadPhoto(path, photo);
    } catch (err) {
      throw new BadRequestException(err);
    }
    return { success: true };
  }

  @UseInterceptors(FilesInterceptor('photos'))
  @UseGuards(AuthGuard)
  @Post('photos')
  async uploadPhotos(
    @Usr() user,
    @UploadedFiles() photos: Array<Express.Multer.File>,
  ) {
    try {
      photos.forEach(async (photo) => {
        // eslint-disable-next-line prettier/prettier
        const path = join(__dirname, '..', '..', 'src', 'storage', 'photos', `photo-${ user.id }.png`);
        await this.filesService.uploadPhoto(path, photo);
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
    return { success: true };
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'photo',
        maxCount: 1,
      },
      {
        name: 'documents',
        maxCount: 10,
      },
    ]),
  )
  @UseGuards(AuthGuard)
  @Post('photos-fields')
  async uploadPhotosFields(
    @Usr() user,
    @UploadedFiles()
    photos: {
      photo: Express.Multer.File;
      documents: Array<Express.Multer.File>;
    },
  ) {
    return photos;
  }
}
