import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'chef@lemenu.de' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ChefKoch' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'lambsauce123' })
  @IsString()
  @MinLength(8)
  password: string;
}
