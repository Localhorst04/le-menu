import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class UpdateNameDto {
  @ApiProperty({ example: 'Chef Koch' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;
}
