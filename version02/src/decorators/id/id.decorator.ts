import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Id = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().params.id;
  },
);
