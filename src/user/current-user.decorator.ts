import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/auth/auth.types';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<AuthRequest>();
    return req.user;
  },
);
