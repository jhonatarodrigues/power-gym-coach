import {
  Activity,
  ClipboardList,
  CreditCard,
  Dumbbell,
  History,
  House,
  Library,
  LogOut,
  MessageSquare,
  UserRound,
} from "lucide-react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

import { BrandLogo } from "@/components";
import { CoachFeedbacksScreen } from "@/screens/CoachFeedbacksScreen";
import { CoachPlanCreateScreen } from "@/screens/CoachPlanCreateScreen";
import { CoachPlanHubScreen } from "@/screens/CoachPlanHubScreen";
import { CoachStudentPlansScreen } from "@/screens/CoachStudentPlansScreen";
import { CoachStudentsScreen } from "@/screens/CoachStudentsScreen";
import { ConversationScreen } from "@/screens/ConversationScreen";
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

function AppDrawerContent(props: DrawerContentComponentProps) {
  const { theme } = useAppTheme();
  const { signOut } = useMockAuth();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ gap: theme.spacing.md }}>
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md }}>
          <BrandLogo size="md" subtitle="Painel operacional" />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          padding: theme.spacing.lg,
        }}
      >
        <DrawerItem
          icon={({ color, size }) => <LogOut color={color} size={size} />}
          label="Sair da conta"
          onPress={signOut}
          labelStyle={{ color: theme.colors.text }}
        />
      </View>
    </View>
  );
}

function TeacherDrawerNavigator() {
  const { theme } = useAppTheme();

  return (
    <TeacherDrawer.Navigator
      drawerContent={(props) => <AppDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textMuted,
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <TeacherDrawer.Screen
        component={TeacherDashboardScreen}
        name="TeacherHome"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <TeacherDrawer.Screen
        component={CoachStudentsScreen}
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
        component={ExerciseLibraryScreen}
        name="TeacherLibrary"
        options={{
          title: "Biblioteca",
          drawerIcon: ({ color, size }) => <Library color={color} size={size} />,
        }}
      />
    </TeacherDrawer.Navigator>
  );
}

function StudentDrawerNavigator() {
  const { theme } = useAppTheme();

  return (
    <StudentDrawer.Navigator
      drawerContent={(props) => <AppDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textMuted,
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
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
      <StudentDrawer.Screen
        component={ConversationScreen}
        name="StudentMessages"
        options={{
          title: "Mensagens",
          drawerIcon: ({ color, size }) => <MessageSquare color={color} size={size} />,
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
            <Stack.Screen component={CoachStudentPlansScreen} name="CoachStudentPlans" />
            <Stack.Screen component={CoachPlanHubScreen} name="CoachPlanHub" />
            <Stack.Screen component={CoachPlanCreateScreen} name="CoachPlanCreate" />
            <Stack.Screen component={CoachFeedbacksScreen} name="CoachFeedbacks" />
            <Stack.Screen component={ConversationScreen} name="Messages" />
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
            <Stack.Screen component={ConversationScreen} name="Messages" />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
