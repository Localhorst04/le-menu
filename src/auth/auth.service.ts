import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { LoginResult, RegisterResult, UserPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}
  // Register
  async register(dto: RegisterDto): Promise<RegisterResult> {
    const userExists = await this.checkRegistered(dto.email);
    if (userExists) return { ok: false, reason: 'CONFLICT' };

    const saltRounds: number = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    let user: User | null = null;
    try {
      user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password_hash: hashedPassword,
        },
      });
      if (!user) return { ok: false, reason: 'BAD' };

      const userPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      };
      return {
        ok: true,
        userPayload: userPayload,
      };
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        return { ok: false, reason: 'CONFLICT' };
      }
      return { ok: false, reason: 'FAILED', cause: err };
    }
  }

  // Login
  async login(loginDto: LoginDto): Promise<LoginResult> {
    const valideUser = await this.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!valideUser) return { ok: false, reason: 'UNAUTHORIZED' };

    try {
      const token = await this.jwtService.signAsync(valideUser);
      return { ok: true, access_token: token };
    } catch {
      return { ok: false, reason: 'BAD' };
    }
  }

  private async checkRegistered(dtoEmail: string): Promise<boolean> {
    const registeredUser = await this.prisma.user.findUnique({
      where: { email: dtoEmail },
    });
    if (registeredUser) return true;
    return false;
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

    return { id: user.id, email: user.email, name: user.name };
  }
}
