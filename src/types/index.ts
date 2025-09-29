export interface Recipe {
  id: string;
  dishName: string;
  localName: string;
  category: 'Breakfast' | 'Lunch' | 'Brunch' | 'Brunch/Lunch' | 'Breakfast/Lunch' | 'Lunch (Side)' | 'Brunch/Beverage';
  classification: 'Core' | 'Special' | 'Experimental' | 'Special (Authentic)' | 'Core (Rotating)';
  description: string;
  ingredients: {
    section?: string;
    items: string[];
  }[];
  prepMethod: string[];
  cookingMethod: string[];
  yield: string;
  nutrition: string;
  allergens: string;
  costing: string;
  qcCheckpoints: string[];
  storage: string[];
  plating: string;
  notes: string;
}
export interface Feedback {
  id: string;
  recipeId: string;
  recipeName: string;
  flavor: number;
  texture: number;
  aroma: number;
  appearance: number;
  portionSize: number;
  overallImpression: number;
  comments?: string;
  timestamp: string;
}
export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
}
export interface ChecklistWeek {
  week: number;
  title: string;
  tasks: ChecklistItem[];
}