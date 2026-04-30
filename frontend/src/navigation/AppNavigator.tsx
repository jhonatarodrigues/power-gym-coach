import {
  Activity,
  ClipboardList,
  CreditCard,
  Dumbbell,
  History,
  House,
  Library,
  MenuSquare,
  UserRound,
} from "lucide-react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useMockAuth } from "@/hooks/useMockAuth";
import { AssessmentScreen } from "@/screens/AssessmentScreen";
import { CurrentPlanScreen } from "@/screens/CurrentPlanScreen";
import { DietEditorScreen } from "@/screens/DietEditorScreen";
import { ExamsScreen } from "@/screens/ExamsScreen";
import { ExerciseLibraryScreen } from "@/screens/ExerciseLibraryScreen";
import { FirstAccessScreen } from "@/screens/FirstAccessScreen";
import { HistoryScreen } from "@/screens/HistoryScreen";
import { MealEditorScreen } from "@/screens/MealEditorScreen";
import { PaymentsScreen } from "@/screens/PaymentsScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { ProgressScreen } from "@/screens/ProgressScreen";
import { RoleSelectionScreen } from "@/screens/RoleSelectionScreen";
import { StudentDetailsScreen } from "@/screens/StudentDetailsScreen";
import { StudentDietScreen } from "@/screens/StudentDietScreen";
import { StudentHomeScreen } from "@/screens/StudentHomeScreen";
import { StudentWorkoutScreen } from "@/screens/StudentWorkoutScreen";
import { SupplementEditorScreen } from "@/screens/SupplementEditorScreen";
import { TeacherDashboardScreen } from "@/screens/TeacherDashboardScreen";
import { TrainingEditorScreen } from "@/screens/TrainingEditorScreen";
import { useAppTheme } from "@/theme";
import type {
  RootStackParamList,
  StudentDrawerParamList,
  TeacherDrawerParamList,
} from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const TeacherDrawer = createDrawerNavigator<TeacherDrawerParamList>();
const StudentDrawer = createDrawerNavigator<StudentDrawerParamList>();

function TeacherDrawerNavigator() {
  const { theme } = useAppTheme();

  return (
    <TeacherDrawer.Navigator
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textMuted,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
      }}
    >
      <TeacherDrawer.Screen
        component={TeacherDashboardScreen}
        name="TeacherHome"
        options={{
          title: "Painel do professor",
          drawerIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <TeacherDrawer.Screen
        component={StudentDetailsScreen}
        name="TeacherStudent"
        options={{
          title: "Alunos",
          drawerIcon: ({ color, size }) => <UserRound color={color} size={size} />,
        }}
      />
      <TeacherDrawer.Screen
        component={PaymentsScreen}
        name="TeacherPayments"
        options={{
          title: "Pagamentos",
          drawerIcon: ({ color, size }) => <CreditCard color={color} size={size} />,
        }}
      />
      <TeacherDrawer.Screen
        component={ProfileScreen}
        name="TeacherProfile"
        options={{
          title: "Seu perfil",
          drawerIcon: ({ color, size }) => <UserRound color={color} size={size} />,
        }}
      />
      <TeacherDrawer.Screen
        component={CurrentPlanScreen}
        name="TeacherPlan"
        options={{
          title: "Plano atual",
          drawerIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      />
      <TeacherDrawer.Screen
        component={ExerciseLibraryScreen}
        name="TeacherLibrary"
        options={{
          title: "Biblioteca",
          drawerIcon: ({ color, size }) => <Library color={color} size={size} />,
        }}
      />
      <TeacherDrawer.Screen
        component={AssessmentScreen}
        name="TeacherAssessment"
        options={{
          title: "Avaliacoes",
          drawerIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      />
      <TeacherDrawer.Screen
        component={ExamsScreen}
        name="TeacherExams"
        options={{
          title: "Exames",
          drawerIcon: ({ color, size }) => <Activity color={color} size={size} />,
        }}
      />
      <TeacherDrawer.Screen
        component={HistoryScreen}
        name="TeacherHistory"
        options={{
          title: "Historico",
          drawerIcon: ({ color, size }) => <History color={color} size={size} />,
        }}
      />
    </TeacherDrawer.Navigator>
  );
}

function StudentDrawerNavigator() {
  const { theme } = useAppTheme();

  return (
    <StudentDrawer.Navigator
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textMuted,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
      }}
    >
      <StudentDrawer.Screen
        component={StudentHomeScreen}
        name="StudentHome"
        options={{
          title: "Painel do aluno",
          drawerIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <StudentDrawer.Screen
        component={StudentWorkoutScreen}
        name="StudentWorkout"
        options={{
          title: "Treino do dia",
          drawerIcon: ({ color, size }) => <Dumbbell color={color} size={size} />,
        }}
      />
      <StudentDrawer.Screen
        component={StudentDietScreen}
        name="StudentDiet"
        options={{
          title: "Dieta",
          drawerIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      />
      <StudentDrawer.Screen
        component={PaymentsScreen}
        name="StudentPayments"
        options={{
          title: "Pagamentos",
          drawerIcon: ({ color, size }) => <CreditCard color={color} size={size} />,
        }}
      />
      <StudentDrawer.Screen
        component={ProfileScreen}
        name="StudentProfile"
        options={{
          title: "Seu perfil",
          drawerIcon: ({ color, size }) => <UserRound color={color} size={size} />,
        }}
      />
      <StudentDrawer.Screen
        component={CurrentPlanScreen}
        name="StudentPlan"
        options={{
          title: "Plano atual",
          drawerIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      />
      <StudentDrawer.Screen
        component={ProgressScreen}
        name="StudentProgress"
        options={{
          title: "Progresso",
          drawerIcon: ({ color, size }) => <Activity color={color} size={size} />,
        }}
      />
      <StudentDrawer.Screen
        component={AssessmentScreen}
        name="StudentAssessment"
        options={{
          title: "Avaliacao",
          drawerIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      />
      <StudentDrawer.Screen
        component={ExamsScreen}
        name="StudentExams"
        options={{
          title: "Exames",
          drawerIcon: ({ color, size }) => <Activity color={color} size={size} />,
        }}
      />
      <StudentDrawer.Screen
        component={HistoryScreen}
        name="StudentHistory"
        options={{
          title: "Historico",
          drawerIcon: ({ color, size }) => <History color={color} size={size} />,
        }}
      />
    </StudentDrawer.Navigator>
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session.isAuthenticated ? (
          <>
            <Stack.Screen component={RoleSelectionScreen} name="RoleSelection" />
            <Stack.Screen component={FirstAccessScreen} name="FirstAccess" />
          </>
        ) : session.accessLevel === "teacher" ? (
          <>
            <Stack.Screen component={TeacherDrawerNavigator} name="TeacherTabs" />
            <Stack.Screen component={DietEditorScreen} name="DietEditor" />
            <Stack.Screen component={TrainingEditorScreen} name="TrainingEditor" />
            <Stack.Screen component={MealEditorScreen} name="MealEditor" />
            <Stack.Screen component={SupplementEditorScreen} name="SupplementEditor" />
            <Stack.Screen component={AssessmentScreen} name="Assessment" />
            <Stack.Screen component={ExamsScreen} name="Exams" />
            <Stack.Screen component={PaymentsScreen} name="Payments" />
            <Stack.Screen component={ProfileScreen} name="Profile" />
          </>
        ) : (
          <>
            <Stack.Screen component={StudentDrawerNavigator} name="StudentTabs" />
            <Stack.Screen component={AssessmentScreen} name="Assessment" />
            <Stack.Screen component={ExamsScreen} name="Exams" />
            <Stack.Screen component={StudentWorkoutScreen} name="StudentWorkout" />
            <Stack.Screen component={PaymentsScreen} name="Payments" />
            <Stack.Screen component={ProfileScreen} name="Profile" />
            <Stack.Screen component={StudentDietScreen} name="StudentDiet" />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
