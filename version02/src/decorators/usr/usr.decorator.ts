import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const Usr = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    if (req.user) {
      if (filter) {
        return req.user[filter];
      }
      return req.user;
    } else {
      throw new NotFoundException('User not found!');
    }
  },
);
