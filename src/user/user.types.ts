export type UserReturn = {
  id: string;
  email: string;
  name: string;
  updated_at?: Date;
};

export type UpdateNameFailReason = 'UNAUTHORIZED' | 'BAD';

export type UpdateNameResult =
  | { ok: true; userReturn: UserReturn }
  | { ok: false; reason: UpdateNameFailReason; cause?: unknown };
