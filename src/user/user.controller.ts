import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from './current-user.decorator';
import type { JwtUser } from 'src/auth/auth.types';
import { UserDto } from './dto/user.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateNameDto } from './dto/update-name.dto';
import { UserReturn } from './user.types';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaClient,
  ) {}

  @Get('me')
  async getMe(@CurrentUser() jwtUser: JwtUser): Promise<UserDto> {
    const user = await this.userService.getById(jwtUser.id);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    return user;
  }

  @Patch('me/name')
  async updateName(
    @CurrentUser() jwtUser: JwtUser,
    @Body() dto: UpdateNameDto,
  ): Promise<UserReturn> {
    const user = await this.userService.getById(jwtUser.id);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    const res = await this.prisma.user.update({
      where: {
        id: jwtUser.id,
      },
      data: {
        name: dto.name,
      },
    });
    return res;
  }
}
