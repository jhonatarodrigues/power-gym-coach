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
          <Stack.Screen component={PlaceholderScreen} name="TeacherTabs" />
          <Stack.Screen component={PlaceholderScreen} name="StudentTabs" />
          <Stack.Screen component={PlaceholderScreen} name="DietEditor" />
          <Stack.Screen component={PlaceholderScreen} name="TrainingEditor" />
          <Stack.Screen component={PlaceholderScreen} name="MealEditor" />
          <Stack.Screen component={PlaceholderScreen} name="SupplementEditor" />
          <Stack.Screen component={PlaceholderScreen} name="Assessment" />
          <Stack.Screen component={PlaceholderScreen} name="Exams" />
          <Stack.Screen component={PlaceholderScreen} name="StudentWorkout" />
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
