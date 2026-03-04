import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateNameResult } from './user.types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getById(id: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updated_at: true,
      },
    });
    if (!user) return null;
    return user;
  }

  async updateName(id: string, newName: string): Promise<UpdateNameResult> {
    const userExists = await this.getById(id);
    if (!userExists) return { ok: false, reason: 'UNAUTHORIZED' };

    try {
      const res = await this.prisma.user.update({
        where: { id },
        data: {
          name: newName,
        },
      });
      return { ok: true, userReturn: res };
    } catch (error) {
      return { ok: false, reason: 'BAD', cause: error };
    }
  }
}
