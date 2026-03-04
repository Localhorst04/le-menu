import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaClient } from '@prisma/client';
import { RecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipeService {
constructor(private readonly prisma: PrismaClient) {}

  create(createRecipeDto: CreateRecipeDto) {
    return 'This action adds a new recipe';
  }

  findAll() {
    return `This action returns all recipe`;
  }

  async getRecipe(recipeId: string, userId?: string) : Promise<RecipeDto | null> {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        recipeIngredients: {
          include: {
            ingredient: true,
          },
        },
        recipeTags: {
          include: {
            tag: true,
          },
        },
        recipeLikes: userId ? {
          where: {
            user_id: userId,
          },
          take: 1,
        } : false,
      },
    });

    if (!recipe) {
      return null;
    }

    // Mapping zu DTOs
    return {
      id: recipe.id,
      name: recipe.title,
      tags: recipe.recipeTags.map(rt => rt.tag.name),
      picURL: recipe.cover_image_url,
      isLiked: recipe.recipeLikes ? recipe.recipeLikes.length > 0 : false,
      ingredients: recipe.recipeIngredients.map(ing => ({
        name: ing.ingredient.name,
        amount: ing.amount,
        unit: ing.unit,
      })),
      description: recipe.description,
    };
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
