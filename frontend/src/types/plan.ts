import type { ID, ISODateString, ISODateTimeString } from "./common";
import type { Meal, MacroTotals, Supplement } from "./nutrition";
import type { TrainingExercise } from "./exercise";

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type PlanStatus = "draft" | "active" | "archived";

export interface TrainingDay {
  id: ID;
  weekday: Weekday;
  title: string;
  notes?: string;
  exercises: TrainingExercise[];
}

export interface TrainingPlan {
  id: ID;
  title: string;
  notes?: string;
  days: TrainingDay[];
}

export interface DietPlan extends MacroTotals {
  id: ID;
  title: string;
  notes?: string;
  waterLitersTarget: number;
  meals: Meal[];
  supplements: Supplement[];
}

export interface Plan {
  id: ID;
  studentId: ID;
  teacherId: ID;
  title: string;
  status: PlanStatus;
  startDate: ISODateString;
  endDate?: ISODateString;
  trainingPlan: TrainingPlan;
  dietPlan: DietPlan;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}
