export interface RecipeRequest {
  ingredients: string;
  diet: string;
  portions: number;
  cuisine: string;
}

export interface FilteredRecipeData {
  title: string;
  ingredients: {
    title: string;
    quantity: string;
    unitOfMeasurement: string;
  }[];
  steps: string[];
}
