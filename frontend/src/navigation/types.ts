import type { NavigatorScreenParams } from "@react-navigation/native";

export type TeacherTabParamList = {
  TeacherDashboardTab: undefined;
  TeacherStudentTab: undefined;
  TeacherPlanTab: undefined;
  TeacherLibraryTab: undefined;
  TeacherHistoryTab: undefined;
};

export type StudentTabParamList = {
  StudentHomeTab: undefined;
  StudentPlanTab: undefined;
  StudentProgressTab: undefined;
  StudentAssessmentTab: undefined;
  StudentHistoryTab: undefined;
};

export type RootStackParamList = {
  RoleSelection: undefined;
  TeacherTabs: NavigatorScreenParams<TeacherTabParamList> | undefined;
  StudentTabs: NavigatorScreenParams<StudentTabParamList> | undefined;
  DietEditor: undefined;
  TrainingEditor: undefined;
  MealEditor: undefined;
  SupplementEditor: undefined;
  Assessment: undefined;
  Exams: undefined;
};
