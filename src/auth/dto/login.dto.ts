import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'chef@lemenu.de' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'lambsauce123' })
  @IsString()
  @MinLength(8)
  password: string;
}
