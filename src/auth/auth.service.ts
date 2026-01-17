import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

type UserPayload = {
  sub: string;
  email: string;
  name: string;
  createdAt?: Date;
};


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  // Register
  async register(registerDto: RegisterDto): Promise<UserPayload> {
    // 10 = salt rounds
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
        password_hash: hashedPassword,
      },
    });

    return {
      sub: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  // Login
  async login(loginDto: LoginDto): Promise<{ access_token: string } | false> {
    const valideUser = await this.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!valideUser) return false;

    return { access_token: await this.jwtService.signAsync(valideUser) };
  }

  private async validateUser(
    email: string,
    pass: string,
  ): Promise<UserPayload | false> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) return false;

    const ok = await bcrypt.compare(pass, user.password_hash);
    if (!ok) return false;

    return { sub: user.id, email: user.email, name: user.name };
  }
}
