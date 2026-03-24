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

