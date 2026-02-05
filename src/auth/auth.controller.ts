import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResult, RegisterResult } from './auth.types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResult> {
    const res = await this.authService.register(registerDto);
    if (!res.ok) {
      switch (res.reason) {
        case 'CONFLICT':
          throw new ConflictException();
        case 'BAD':
          throw new BadRequestException();
        case 'FAILED':
          throw res.cause;
      }
    }
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResult> {
    const req = await this.authService.login(loginDto);
    if (!req.ok) {
      switch (req.reason) {
        case 'UNAUTHORIZED':
          throw new UnauthorizedException();
        case 'BAD':
          throw new BadRequestException();
      }
    }
    return req;
  }
}
