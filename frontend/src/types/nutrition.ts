import type { ID } from "./common";

export type MealType =
  | "breakfast"
  | "morningSnack"
  | "lunch"
  | "afternoonSnack"
  | "dinner"
  | "supper";

export type FoodCategory =
  | "fruit"
  | "vegetable"
  | "legume"
  | "grain"
  | "meat"
  | "dairy"
  | "fat"
  | "drink"
  | "supplement"
  | "other";

export type FoodBaseUnit = "g" | "ml" | "unit" | "slice" | "spoon";

export interface MacroTotals {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber?: number;
}

export interface FoodLibraryItem extends MacroTotals {
  id: ID;
  name: string;
  category: FoodCategory;
  defaultBaseLabel: string;
  baseAmount: number;
  baseUnit: FoodBaseUnit;
  source: string;
}

export interface MealItem extends MacroTotals {
  id: ID;
  foodId: ID;
  foodName: string;
  amount: number;
  unit: FoodBaseUnit;
  observation?: string;
}

export interface Meal extends MacroTotals {
  id: ID;
  type: MealType;
  title: string;
  sequenceLabel?: string;
  observation?: string;
  items: MealItem[];
}

export interface Supplement extends MacroTotals {
  id: ID;
  name: string;
  dosage: string;
  timing: string;
  observation?: string;
}
