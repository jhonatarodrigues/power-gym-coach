import type { NavigatorScreenParams } from "@react-navigation/native";

export type TeacherTabParamList = {
  TeacherHome: undefined;
  TeacherStudent: undefined;
  TeacherPayments: undefined;
};

export type TeacherDrawerParamList = {
  TeacherMain: NavigatorScreenParams<TeacherTabParamList> | undefined;
  TeacherProfile: undefined;
  TeacherLibrary: undefined;
};

export type StudentTabParamList = {
  StudentHome: undefined;
  StudentWorkout: undefined;
  StudentDiet: undefined;
  StudentPayments: undefined;
};

export type StudentDrawerParamList = {
  StudentMain: NavigatorScreenParams<StudentTabParamList> | undefined;
  StudentProfile: undefined;
  StudentPlan: undefined;
  StudentProgress: undefined;
  StudentAssessment: undefined;
  StudentHistory: undefined;
  StudentExams: undefined;
  StudentMessages: undefined;
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
  CoachStudentPlans: undefined;
  CoachPlanHub: undefined;
  CoachPlanCreate: undefined;
  CoachFeedbacks: undefined;
  Messages: undefined;
};
