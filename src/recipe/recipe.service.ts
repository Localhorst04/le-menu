import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RecipeDto } from './dto/recipe.dto';
import { PreviewRecipeDto } from './dto/preview-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllRecipes(userId?: string): Promise<PreviewRecipeDto[] | null> {
    const recipes = await this.prisma.recipe.findMany({
      include: {
        recipeTags: {
          include: {
            tag: true,
          },
        },
        recipeLikes: userId
          ? {
              where: {
                userId: userId,
              },
              take: 1,
            }
          : false,
      },
    });

    if (!recipes || recipes.length === 0) {
      return null;
    }

    return recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.title,
      tags: recipe.recipeTags.map((rt) => rt.tag.name),
      picURL: recipe.coverImageUrl,
      isLiked: recipe.recipeLikes ? recipe.recipeLikes.length > 0 : false,
    }));
  }

  async getRecipe(
    recipeId: string,
    userId?: string,
  ): Promise<RecipeDto | null> {
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
        recipeLikes: userId
          ? {
              where: {
                userId: userId,
              },
              take: 1,
            }
          : false,
      },
    });

    if (!recipe) {
      return null;
    }

    return {
      id: recipe.id,
      name: recipe.title,
      tags: recipe.recipeTags.map((rt) => rt.tag.name),
      picURL: recipe.coverImageUrl,
      isLiked: recipe.recipeLikes ? recipe.recipeLikes.length > 0 : false,
      ingredients: recipe.recipeIngredients.map((ing) => ({
        name: ing.ingredient.name,
        amount: ing.amount,
        unit: ing.unit,
      })),
      description: recipe.description,
    };
  }
}
