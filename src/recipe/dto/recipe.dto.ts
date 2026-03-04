export class IngredientDto {
  'name': string;
  'amount': number;
  'unit': string;
}

export class RecipeDto {
  'id': string;
  'name': string;
  'tags': string[];
  'picURL': string;
  'isLiked': boolean;
  'ingredients': IngredientDto[];
  'description': string;
}

// --- TEST FOR FUTURE ---
/* import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsUrl,
  IsNumber,
  Min,
  ValidateNested,
  ArrayMinSize,
  IsNotEmpty,
  Matches,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';

// ==================== INGREDIENT DTOs ====================

export class IngredientDto {
  @ApiProperty({
    description: 'Name der Zutat',
    example: 'Spaghetti',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Menge der Zutat',
    example: 500,
    minimum: 0.1,
    type: Number
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.1)
  amount: number;

  @ApiProperty({
    description: 'Einheit der Zutat',
    example: 'g',
    enum: ['g', 'kg', 'ml', 'l', 'Stück', 'EL', 'TL', 'Prise', 'Bund', 'Zehe', 'Dose', 'Packung']
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(g|kg|ml|l|Stück|EL|TL|Prise|Bund|Zehe|Dose|Packung)$/, {
    message: 'unit muss eine gültige Einheit sein: g, kg, ml, l, Stück, EL, TL, Prise, Bund, Zehe, Dose, Packung'
  })
  unit: string;
}

// ==================== CREATE DTOs ====================

export class CreateIngredientDto {
  @ApiProperty({
    description: 'Name der Zutat',
    example: 'Spaghetti',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Menge der Zutat',
    example: 500,
    minimum: 0.1,
    type: Number
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.1)
  amount: number;

  @ApiProperty({
    description: 'Einheit der Zutat',
    example: 'g',
    enum: ['g', 'kg', 'ml', 'l', 'Stück', 'EL', 'TL', 'Prise', 'Bund', 'Zehe', 'Dose', 'Packung']
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(g|kg|ml|l|Stück|EL|TL|Prise|Bund|Zehe|Dose|Packung)$/, {
    message: 'unit muss eine gültige Einheit sein: g, kg, ml, l, Stück, EL, TL, Prise, Bund, Zehe, Dose, Packung'
  })
  unit: string;
}

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Name des Rezepts',
    example: 'Spaghetti Carbonara',
    minLength: 3,
    maxLength: 200
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @ApiProperty({
    description: 'Tags für das Rezept',
    example: ['italienisch', 'Pasta', 'Hauptgericht'],
    type: [String],
    minItems: 1
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @MinLength(2, { each: true })
  @MaxLength(50, { each: true })
  tags: string[];

  @ApiProperty({
    description: 'URL des Rezeptbildes',
    example: 'https://example.com/images/spaghetti-carbonara.jpg'
  })
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true
  })
  @IsNotEmpty()
  picURL: string;

  @ApiProperty({
    description: 'Zutaten des Rezepts',
    type: [CreateIngredientDto],
    example: [
      { name: 'Spaghetti', amount: 500, unit: 'g' },
      { name: 'Eier', amount: 4, unit: 'Stück' },
      { name: 'Pecorino', amount: 100, unit: 'g' },
      { name: 'Guanciale', amount: 150, unit: 'g' },
      { name: 'Pfeffer', amount: 1, unit: 'Prise' }
    ],
    minItems: 1
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  @ArrayMinSize(1)
  ingredients: CreateIngredientDto[];

  @ApiProperty({
    description: 'Beschreibung/Anleitung des Rezepts',
    example: '1. Guanciale würfeln und in einer Pfanne knusprig auslassen.\n2. Eier mit geriebenem Pecorino verrühren.\n3. Spaghetti al dente kochen.\n4. Alles vermengen und mit Pfeffer servieren.',
    minLength: 10,
    maxLength: 5000
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(5000)
  description: string;
} */
