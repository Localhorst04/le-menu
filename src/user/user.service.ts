import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getById(id: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!user) return null;

    return user;
  }
}
