export type UserReturn = {
  id: string;
  email: string;
  name: string;
  updatedAt?: Date;
};

export type UpdateNameFailReason = 'UNAUTHORIZED' | 'BAD';

export type UpdateNameResult =
  | { ok: true; userReturn: UserReturn }
  | { ok: false; reason: UpdateNameFailReason; cause?: unknown };
