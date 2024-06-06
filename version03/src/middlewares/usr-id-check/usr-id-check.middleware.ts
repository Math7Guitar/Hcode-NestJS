import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsrIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UsrIdCheckMiddleware: ', 'antes');

    if (req.params.id.length <= 10) {
      throw new BadRequestException('Invalid id.');
    }

    console.log('UsrIdCheckMiddleware: ', 'depois');

    next();
  }
}
