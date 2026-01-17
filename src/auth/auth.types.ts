import { Request } from 'express';

export type JwtUser = { sub: string; email: string; name: string };
export type AuthRequest = Request & { user: JwtUser };

export type UserPayload = {
  sub: string;
  email: string;
  name: string;
  createdAt?: Date;
};
