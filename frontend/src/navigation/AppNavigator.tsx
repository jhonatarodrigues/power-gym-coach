import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useMockAuth } from "@/hooks/useMockAuth";
import { AssessmentScreen } from "@/screens/AssessmentScreen";
import { CurrentPlanScreen } from "@/screens/CurrentPlanScreen";
import { DietEditorScreen } from "@/screens/DietEditorScreen";
import { ExamsScreen } from "@/screens/ExamsScreen";
import { ExerciseLibraryScreen } from "@/screens/ExerciseLibraryScreen";
import { HistoryScreen } from "@/screens/HistoryScreen";
import { MealEditorScreen } from "@/screens/MealEditorScreen";
import { ProgressScreen } from "@/screens/ProgressScreen";
import { RoleSelectionScreen } from "@/screens/RoleSelectionScreen";
import { StudentHomeScreen } from "@/screens/StudentHomeScreen";
import { StudentDetailsScreen } from "@/screens/StudentDetailsScreen";
import { SupplementEditorScreen } from "@/screens/SupplementEditorScreen";
import { TeacherDashboardScreen } from "@/screens/TeacherDashboardScreen";
import { TrainingEditorScreen } from "@/screens/TrainingEditorScreen";
import { useAppTheme } from "@/theme";
import type {
  RootStackParamList,
  StudentTabParamList,
  TeacherTabParamList,
} from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const TeacherTabs = createBottomTabNavigator<TeacherTabParamList>();
const StudentTabs = createBottomTabNavigator<StudentTabParamList>();

function TeacherTabsNavigator() {
  const { theme } = useAppTheme();

  return (
    <TeacherTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: theme.spacing.sm,
          paddingTop: theme.spacing.sm,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.caption,
          fontWeight: "700",
        },
      }}
    >
      <TeacherTabs.Screen
        component={TeacherDashboardScreen}
        name="TeacherDashboardTab"
        options={{ title: "Dashboard" }}
      />
      <TeacherTabs.Screen
        component={StudentDetailsScreen}
        name="TeacherStudentTab"
        options={{ title: "Aluno" }}
      />
      <TeacherTabs.Screen
        component={CurrentPlanScreen}
        name="TeacherPlanTab"
        options={{ title: "Plano" }}
      />
      <TeacherTabs.Screen
        component={ExerciseLibraryScreen}
        name="TeacherLibraryTab"
        options={{ title: "Biblioteca" }}
      />
      <TeacherTabs.Screen
        component={HistoryScreen}
        name="TeacherHistoryTab"
        options={{ title: "Historico" }}
      />
    </TeacherTabs.Navigator>
  );
}

function StudentTabsNavigator() {
  const { theme } = useAppTheme();

  return (
    <StudentTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: theme.spacing.sm,
          paddingTop: theme.spacing.sm,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.caption,
          fontWeight: "700",
        },
      }}
    >
      <StudentTabs.Screen
        component={StudentHomeScreen}
        name="StudentHomeTab"
        options={{ title: "Inicio" }}
      />
      <StudentTabs.Screen
        component={CurrentPlanScreen}
        name="StudentPlanTab"
        options={{ title: "Plano" }}
      />
      <StudentTabs.Screen
        component={ProgressScreen}
        name="StudentProgressTab"
        options={{ title: "Progresso" }}
      />
      <StudentTabs.Screen
        component={AssessmentScreen}
        name="StudentAssessmentTab"
        options={{ title: "Avaliacao" }}
      />
      <StudentTabs.Screen
        component={HistoryScreen}
        name="StudentHistoryTab"
        options={{ title: "Historico" }}
      />
    </StudentTabs.Navigator>
  );
}

export function AppNavigator() {
  const { resolvedMode, theme } = useAppTheme();
  const { session } = useMockAuth();

  const navigationTheme =
    resolvedMode === "dark"
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: theme.colors.background,
            card: theme.colors.background,
            border: theme.colors.border,
            primary: theme.colors.primary,
            text: theme.colors.text,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: theme.colors.background,
            card: theme.colors.background,
            border: theme.colors.border,
            primary: theme.colors.primary,
            text: theme.colors.text,
          },
        };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        {!session.isAuthenticated ? (
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        ) : session.accessLevel === "teacher" ? (
          <>
            <Stack.Screen name="TeacherTabs" component={TeacherTabsNavigator} />
            <Stack.Screen name="DietEditor" component={DietEditorScreen} />
            <Stack.Screen name="TrainingEditor" component={TrainingEditorScreen} />
            <Stack.Screen name="MealEditor" component={MealEditorScreen} />
            <Stack.Screen
              name="SupplementEditor"
              component={SupplementEditorScreen}
            />
            <Stack.Screen name="Assessment" component={AssessmentScreen} />
            <Stack.Screen name="Exams" component={ExamsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="StudentTabs" component={StudentTabsNavigator} />
            <Stack.Screen name="Exams" component={ExamsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
