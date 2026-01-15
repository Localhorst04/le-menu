import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // 10 = salt rounds
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
        password_hash: hashedPassword,
      },
    });

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    return payload;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }

  private async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password_hash);
      if (isPasswordMatching) {
        const result = { sub: user.id, email: user.email, name: user.name };
        return result;
      }
      return null;
    }
  }
}
