export interface Ingredient {
  name: string;
  measure: string;
}

export interface Cocktail {
  id: number;
  name: string;
  description: string;
  instructions: string;
  imageUrl: string;
  category: string;
  alcoholic: boolean;
  glass: string;
  ingredients: Ingredient[];
}