export interface FoodValue {
  calories: number;
  fats: number;
  carbohydrates: number;
  proteins: number;
}

export interface CookingStep {
  title: string;
  description: string;
}

export interface Ingredient {
  title: string;
  description: string;
}

export interface Author {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface Comment {
  id: string;
  postId: string;
  user: any;
  text: string;
  createdOn: string;
  updatedOn: string;
}

export interface Recipe {
  id: string;
  body: string;
  title: string;
  tags: string[];
  image: string;
  timeCooking: number;
  foodValue: FoodValue;
  cookingSteps: CookingStep[];
  ingredients: Ingredient[];
  author: Author;
  comments: Comment[];
  createdOn: string;
  updatedOn: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}
