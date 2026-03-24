-- RenameForeignKey
ALTER TABLE "Recipe" RENAME CONSTRAINT "Recipe_author_id_fkey" TO "Recipe_authorId_fkey";

-- RenameForeignKey
ALTER TABLE "RecipeIngredient" RENAME CONSTRAINT "RecipeIngredient_ingredient_id_fkey" TO "RecipeIngredient_ingredientId_fkey";

-- RenameForeignKey
ALTER TABLE "RecipeIngredient" RENAME CONSTRAINT "RecipeIngredient_recipe_id_fkey" TO "RecipeIngredient_recipeId_fkey";

-- RenameForeignKey
ALTER TABLE "RecipeLike" RENAME CONSTRAINT "RecipeLike_recipe_id_fkey" TO "RecipeLike_recipeId_fkey";

-- RenameForeignKey
ALTER TABLE "RecipeLike" RENAME CONSTRAINT "RecipeLike_user_id_fkey" TO "RecipeLike_userId_fkey";

-- RenameForeignKey
ALTER TABLE "RecipeTag" RENAME CONSTRAINT "RecipeTag_recipe_id_fkey" TO "RecipeTag_recipeId_fkey";

-- RenameForeignKey
ALTER TABLE "RecipeTag" RENAME CONSTRAINT "RecipeTag_tag_id_fkey" TO "RecipeTag_tagId_fkey";
