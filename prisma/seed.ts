import { prisma } from './prismaclient';

import type { User, Recipe, Ingredient, Tag } from '@prisma/client';

// Helpers: accept readonly arrays/tuples
function pick<T>(arr: readonly T[]): T {
  if (arr.length === 0) throw new Error('pick() called with empty array');
  else return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany<T>(arr: readonly T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const copy = [...arr];
  const out: T[] = [];
  if (arr.length === 0) throw new Error('pick() called with empty array');

  while (out.length < count && copy.length) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

async function main() {
  console.log('🌱 Seeding database...');

  // Wipe (dev only)
  await prisma.recipeTag.deleteMany();
  await prisma.recipeLike.deleteMany();
  await prisma.recipeIngredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.user.deleteMany();

  // USERS
  const usersData = [
    { email: 'horst@lemenu.local', name: 'Hors', password_hash: 'hash_demo_1' },
    { email: 'mia@lemenu.local', name: 'Mia', password_hash: 'hash_demo_2' },
    { email: 'alex@lemenu.local', name: 'Alex', password_hash: 'hash_demo_3' },
    { email: 'sam@lemenu.local', name: 'Sam', password_hash: 'hash_demo_4' },
    { email: 'lena@lemenu.local', name: 'Lena', password_hash: 'hash_demo_5' },
  ] as const;

  const users: User[] = [];
  for (const u of usersData) {
    users.push(await prisma.user.create({ data: u }));
  }

  // INGREDIENTS
  const ingredientNames = [
    'Flour',
    'Eggs',
    'Milk',
    'Butter',
    'Sugar',
    'Salt',
    'Pepper',
    'Olive Oil',
    'Garlic',
    'Onion',
    'Tomatoes',
    'Pasta',
    'Rice',
    'Chicken Breast',
    'Beef Mince',
    'Parmesan',
    'Mozzarella',
    'Basil',
    'Oregano',
    'Lemon',
    'Potatoes',
    'Carrots',
    'Mushrooms',
    'Spinach',
    'Yogurt',
  ] as const;

  const ingredients: Ingredient[] = [];
  for (const name of ingredientNames) {
    ingredients.push(await prisma.ingredient.create({ data: { name } }));
  }

  // TAGS
  const tagNames = [
    'Meat',
    'Fish',
    'Vegan',
    'Vegetarian',
    'Sweet',
    'Halal',
  ] as const;

  const tags: Tag[] = [];
  for (const name of tagNames) {
    tags.push(await prisma.tag.create({ data: { name } }));
  }

  // RECIPES
  const recipeTemplates = [
    {
      title: 'Creamy Garlic Pasta',
      description: 'A fast weeknight pasta with garlic and parmesan.',
      cover_image_url: 'https://picsum.photos/seed/pasta/900/600',
    },
    {
      title: 'Fluffy Pancakes',
      description:
        'Classic pancakes — soft, fluffy, and perfect for breakfast.',
      cover_image_url: 'https://picsum.photos/seed/pancakes/900/600',
    },
    {
      title: 'Chicken Rice Bowl',
      description: 'Simple chicken bowl with rice, veggies, and a sauce.',
      cover_image_url: 'https://picsum.photos/seed/bowl/900/600',
    },
    {
      title: 'Tomato Basil Soup',
      description: 'Comforting soup with tomatoes, garlic, and basil.',
      cover_image_url: 'https://picsum.photos/seed/soup/900/600',
    },
    {
      title: 'Crispy Roasted Potatoes',
      description: 'Golden roasted potatoes with olive oil and spices.',
      cover_image_url:
        'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/roastpotatoes_92811_16x9.jpg',
    },
    {
      title: 'Mushroom Omelette',
      description: 'Protein breakfast omelette with mushrooms and cheese.',
      cover_image_url: 'https://picsum.photos/seed/omelette/900/600',
    },
  ] as const;

  const units = ['g', 'ml', 'pcs', 'tbsp', 'tsp'] as const;

  const recipes: Recipe[] = [];

  for (let i = 0; i < 12; i++) {
    const author = pick(users);
    const tpl = pick(recipeTemplates);

    const recipe = await prisma.recipe.create({
      data: {
        author_id: author.id,
        title: `${tpl.title} #${i + 1}`,
        description: tpl.description,
        cover_image_url: tpl.cover_image_url,
      },
    });

    recipes.push(recipe);

    // Ingredients: 4-8
    for (const ing of pickMany(ingredients, 4, 8)) {
      await prisma.recipeIngredient.create({
        data: {
          recipe_id: recipe.id,
          ingredient_id: ing.id,
          amount: Math.floor(Math.random() * 500) + 1,
          unit: pick(units),
        },
      });
    }

    // Tags: 1-4
    for (const t of pickMany(tags, 1, 4)) {
      await prisma.recipeTag.create({
        data: {
          recipe_id: recipe.id,
          tag_id: t.id,
        },
      });
    }
  }

  // LIKES
  for (const user of users) {
    for (const recipe of pickMany(recipes, 1, 5)) {
      await prisma.recipeLike
        .create({
          data: { user_id: user.id, recipe_id: recipe.id },
        })
        .catch(() => undefined);
    }
  }

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
