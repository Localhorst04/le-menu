import { IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class UpdateNameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;
}
