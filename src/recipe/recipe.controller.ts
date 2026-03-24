import {
  Controller,
  Get,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/recipe.dto';
import { PreviewRecipeDto } from './dto/preview-recipe.dto';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all recipes without details' })
  @ApiParam({
    name: 'userId',
    required: false,
    description: 'User ID for like status',
  })
  async getAllRecipes(
    @Param('userId') userId?: string,
  ): Promise<PreviewRecipeDto[]> {
    const allRecipes = await this.recipeService.getAllRecipes(userId);

    if (!allRecipes) {
      throw new NotFoundException(`No Recipes found`);
    }

    return allRecipes;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get recipe by ID with details' })
  @ApiParam({ name: 'id', description: 'Recipe UUID' })
  @ApiParam({
    name: 'userId',
    required: false,
    description: 'User ID for like status',
  })
  @ApiResponse({
    status: 200,
    description: 'Return recipe details',
    type: RecipeDto,
  })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  async getRecipe(
    @Param('id') id: string,
    @Param('userId') userId?: string,
  ): Promise<RecipeDto> {
    const recipe = await this.recipeService.getRecipe(id, userId);

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }
}
