import type { ID, ISODateTimeString } from "./common";

export type ExerciseCategory =
  | "strength"
  | "hypertrophy"
  | "mobility"
  | "cardio"
  | "warmup"
  | "rehab";

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "legs"
  | "glutes"
  | "core"
  | "fullBody"
  | "cardio";

export type EquipmentType =
  | "barbell"
  | "dumbbell"
  | "machine"
  | "cable"
  | "bodyweight"
  | "band"
  | "kettlebell"
  | "bike"
  | "treadmill"
  | "other";

export interface ExerciseLibraryItem {
  id: ID;
  name: string;
  category: ExerciseCategory;
  muscleGroup: MuscleGroup;
  equipment: EquipmentType;
  instructions: string;
  demoVideoUrl?: string;
  thumbnailUrl?: string;
  createdByTeacherId?: ID;
  isCustom: boolean;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export interface TrainingExercise {
  id: ID;
  exerciseId: ID;
  exerciseName: string;
  sets: string;
  reps: string;
  restSeconds: number;
  loadNotes?: string;
  executionNotes?: string;
  demoVideoUrl?: string;
  order: number;
}
