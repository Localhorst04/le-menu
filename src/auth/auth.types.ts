import { Request } from 'express';

export type JwtUser = { sub: string; email: string; name: string };
export type AuthRequest = Request & { user: JwtUser };

export type RegisterFailReason = 'CONFLICT' | 'BAD';
export type LoginFailReason = 'UNAUTHORIZED' | 'BAD';

export type RegisterResult =
  | { ok: true; userPayload: UserPayload }
  | { ok: false; reason: RegisterFailReason };

export type LoginResult =
  | { ok: true; access_token: string }
  | { ok: false; reason: LoginFailReason };

export type UserPayload = {
  sub: string;
  email: string;
  name: string;
  createdAt?: Date;
};
