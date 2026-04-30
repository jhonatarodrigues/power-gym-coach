import type { NavigatorScreenParams } from "@react-navigation/native";

export type TeacherDrawerParamList = {
  TeacherHome: undefined;
  TeacherStudent: undefined;
  TeacherPayments: undefined;
  TeacherProfile: undefined;
  TeacherLibrary: undefined;
  TeacherHistory: undefined;
  TeacherPlan: undefined;
  TeacherAssessment: undefined;
  TeacherExams: undefined;
};

export type StudentDrawerParamList = {
  StudentHome: undefined;
  StudentWorkout: undefined;
  StudentDiet: undefined;
  StudentPayments: undefined;
  StudentProfile: undefined;
  StudentPlan: undefined;
  StudentProgress: undefined;
  StudentAssessment: undefined;
  StudentHistory: undefined;
  StudentExams: undefined;
};

export type RootStackParamList = {
  RoleSelection: undefined;
  FirstAccess: undefined;
  TeacherTabs: NavigatorScreenParams<TeacherDrawerParamList> | undefined;
  StudentTabs: NavigatorScreenParams<StudentDrawerParamList> | undefined;
  DietEditor: undefined;
  TrainingEditor: undefined;
  MealEditor: undefined;
  SupplementEditor: undefined;
  Assessment: undefined;
  Exams: undefined;
  StudentWorkout: undefined;
  Payments: undefined;
  Profile: undefined;
  StudentDiet: undefined;
};
