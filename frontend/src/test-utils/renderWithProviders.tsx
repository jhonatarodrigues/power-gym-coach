import type { PropsWithChildren, ReactElement } from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppThemeProvider } from "@/theme";

const Stack = createNativeStackNavigator();
const PlaceholderScreen = () => <View />;

export function Providers({ children }: PropsWithChildren) {
  return (
    <NavigationContainer>
      <AppThemeProvider>
        <Stack.Navigator
          initialRouteName="TestScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen component={PlaceholderScreen} name="RoleSelection" />
          <Stack.Screen component={PlaceholderScreen} name="FirstAccess" />
          <Stack.Screen component={PlaceholderScreen} name="TeacherTabs" />
          <Stack.Screen component={PlaceholderScreen} name="StudentTabs" />
          <Stack.Screen component={PlaceholderScreen} name="DietEditor" />
          <Stack.Screen component={PlaceholderScreen} name="TrainingEditor" />
          <Stack.Screen component={PlaceholderScreen} name="MealEditor" />
          <Stack.Screen component={PlaceholderScreen} name="SupplementEditor" />
          <Stack.Screen component={PlaceholderScreen} name="Assessment" />
          <Stack.Screen component={PlaceholderScreen} name="Exams" />
          <Stack.Screen component={PlaceholderScreen} name="StudentWorkout" />
          <Stack.Screen component={PlaceholderScreen} name="Payments" />
          <Stack.Screen component={PlaceholderScreen} name="Profile" />
          <Stack.Screen component={PlaceholderScreen} name="StudentDiet" />
          <Stack.Screen component={PlaceholderScreen} name="CoachStudentPlans" />
          <Stack.Screen component={PlaceholderScreen} name="CoachPlanHub" />
          <Stack.Screen component={PlaceholderScreen} name="CoachPlanCreate" />
          <Stack.Screen component={PlaceholderScreen} name="CoachFeedbacks" />
          <Stack.Screen component={PlaceholderScreen} name="Messages" />
          <Stack.Screen name="TestScreen">
            {() => children}
          </Stack.Screen>
        </Stack.Navigator>
      </AppThemeProvider>
    </NavigationContainer>
  );
}

export function renderWithProviders(ui: ReactElement) {
  return render(ui, { wrapper: Providers });
}
