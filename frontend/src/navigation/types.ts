import type { NavigatorScreenParams } from "@react-navigation/native";

export type TeacherTabParamList = {
  TeacherDashboardTab: undefined;
  TeacherStudentTab: undefined;
  TeacherPaymentsTab: undefined;
};

export type StudentTabParamList = {
  StudentHomeTab: undefined;
  StudentWorkoutTab: undefined;
  StudentDietTab: undefined;
};

export type TeacherDrawerParamList = {
  TeacherHome: NavigatorScreenParams<TeacherTabParamList> | undefined;
  TeacherProfile: undefined;
  TeacherLibrary: undefined;
  TeacherHistory: undefined;
  TeacherPlan: undefined;
  TeacherAssessment: undefined;
  TeacherExams: undefined;
};

export type StudentDrawerParamList = {
  StudentHome: NavigatorScreenParams<StudentTabParamList> | undefined;
  StudentProfile: undefined;
  StudentPayments: undefined;
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
