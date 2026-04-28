import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useMockAuth } from "@/hooks/useMockAuth";
import { AssessmentScreen } from "@/screens/AssessmentScreen";
import { CurrentPlanScreen } from "@/screens/CurrentPlanScreen";
import { DietEditorScreen } from "@/screens/DietEditorScreen";
import { ExerciseLibraryScreen } from "@/screens/ExerciseLibraryScreen";
import { HistoryScreen } from "@/screens/HistoryScreen";
import { MealEditorScreen } from "@/screens/MealEditorScreen";
import { RoleSelectionScreen } from "@/screens/RoleSelectionScreen";
import { StudentHomeScreen } from "@/screens/StudentHomeScreen";
import { StudentDetailsScreen } from "@/screens/StudentDetailsScreen";
import { TeacherDashboardScreen } from "@/screens/TeacherDashboardScreen";
import { TrainingEditorScreen } from "@/screens/TrainingEditorScreen";
import { useAppTheme } from "@/theme";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
            <Stack.Screen
              name="TeacherDashboard"
              component={TeacherDashboardScreen}
            />
            <Stack.Screen
              name="ExerciseLibrary"
              component={ExerciseLibraryScreen}
            />
            <Stack.Screen
              name="StudentDetails"
              component={StudentDetailsScreen}
            />
            <Stack.Screen name="CurrentPlan" component={CurrentPlanScreen} />
            <Stack.Screen name="DietEditor" component={DietEditorScreen} />
            <Stack.Screen
              name="TrainingEditor"
              component={TrainingEditorScreen}
            />
            <Stack.Screen name="MealEditor" component={MealEditorScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Assessment" component={AssessmentScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
            <Stack.Screen name="CurrentPlan" component={CurrentPlanScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Assessment" component={AssessmentScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
