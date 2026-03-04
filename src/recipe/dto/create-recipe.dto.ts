// src/recipes/dto/create-recipe.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsUrl,
  IsNumber,
  Min,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIngredientDto {
  @ApiProperty({ description: 'Name der Zutat', example: 'Kartoffeln' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Menge der Zutat', example: '1' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'Einheit der Zutat (z.B. g, ml, Stück)',
    example: 'Kg',
  })
  @IsString()
  unit: string;
}

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Name des Rezepts',
    example: 'Kartoffel Auflauf',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tags für das Rezept',
    type: [String],
    example: '["schnell", "vegan"]',
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: string[];

  @ApiProperty({ description: 'URL des Rezeptbildes', example: 'eine URL' })
  @IsUrl()
  picURL: string;

  @ApiProperty({
    description: 'Zutaten des Rezepts',
    type: [CreateIngredientDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  @ArrayMinSize(1)
  ingredients: CreateIngredientDto[];

  @ApiProperty({
    description: 'Beschreibung/Anleitung des Rezepts',
    example: 'ein super Kartoffel auflauf',
  })
  @IsString()
  description: string;
}
