import { UserDto } from './dtos/user.dto';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext):UserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
