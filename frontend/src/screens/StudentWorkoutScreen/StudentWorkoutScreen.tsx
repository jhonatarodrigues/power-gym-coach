import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Apple, ChartColumn, House, Menu, Dumbbell } from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  WorkoutProgressCard,
} from "@/components";
import { useStudentTodayWorkout } from "@/hooks/useStudentTodayWorkout";
import { useAppTheme } from "@/theme";

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export function StudentWorkoutScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const {
    completedCount,
    completionRate,
    isExerciseCompleted,
    resetDay,
    todayTraining,
    toggleExercise,
    totalExercises,
  } = useStudentTodayWorkout();

  if (!todayTraining) {
    return null;
  }

  return (
    <AppChrome
      footer={
        <AppBottomNav
          items={[
            {
              key: "dashboard",
              label: "Dashboard",
              icon: <House color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentHome" as never),
            },
            {
              key: "workout",
              label: "Treino",
              active: true,
              icon: <Dumbbell color={theme.colors.primary} size={21} strokeWidth={2.1} />,
            },
            {
              key: "diet",
              label: "Dieta",
              icon: <Apple color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentDiet" as never),
            },
            {
              key: "progress",
              label: "Progresso",
              icon: <ChartColumn color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentProgress" as never),
            },
            {
              key: "more",
              label: "Mais",
              icon: <Menu color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentMessages" as never),
            },
          ]}
        />
      }
    >
      <AppTopBar
        onBackPress={() => navigation.goBack()}
        showAvatar={false}
        showBack
        showBell={false}
        subtitle="Sexta-feira, 09/05/2026"
        title="Treino de hoje"
      />

      <View style={{ flexDirection: "row", gap: 8, justifyContent: "space-between" }}>
        {weekDays.map((day) => {
          const active = day === "Sex";

          return (
            <View
              key={day}
              style={{
                alignItems: "center",
                backgroundColor: active ? theme.colors.primary : "transparent",
                borderRadius: theme.radius.pill,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  color: active ? "#121212" : theme.colors.textMuted,
                  fontSize: 11.5,
                  fontWeight: active ? "700" : "500",
                }}
              >
                {day}
              </Text>
            </View>
          );
        })}
      </View>

      <WorkoutProgressCard
        completed={completedCount}
        completionPercentage={completionRate}
        estimatedMinutesLeft={45}
        total={totalExercises}
      />

      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: "rgba(255,255,255,0.06)",
          borderRadius: 22,
          borderWidth: 1,
          overflow: "hidden",
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 15,
            fontWeight: "600",
            paddingBottom: 12,
            paddingTop: 16,
          }}
        >
          Exercícios
        </Text>
        {todayTraining.exercises.map((exercise, index) => {
          const checked = isExerciseCompleted(todayTraining.id, exercise.id);

          return (
            <Pressable
              key={exercise.id}
              onPress={() => toggleExercise(todayTraining.id, exercise.id)}
              style={{
                alignItems: "center",
                borderBottomColor: "rgba(255,255,255,0.06)",
                borderBottomWidth: index === todayTraining.exercises.length - 1 ? 0 : 1,
                flexDirection: "row",
                gap: 10,
                paddingVertical: 12,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: checked ? `${theme.colors.success}22` : theme.colors.surfaceAlt,
                  borderRadius: theme.radius.pill,
                  height: 24,
                  justifyContent: "center",
                  width: 24,
                }}
              >
                <Text style={{ color: checked ? theme.colors.success : theme.colors.textMuted, fontSize: 11.5 }}>
                  {index + 1}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.text, fontSize: 13.5, fontWeight: "600" }}>
                  {exercise.exerciseName}
                </Text>
                <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                  {exercise.sets} séries × {exercise.reps}
                </Text>
              </View>
              <Text
                style={{
                  color: checked ? theme.colors.success : theme.colors.textMuted,
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {checked ? "●" : "○"}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => resetDay(todayTraining.id)}
        style={{
          alignItems: "center",
          alignSelf: "center",
          paddingVertical: 8,
        }}
      >
        <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
          Reiniciar marcações do dia
        </Text>
      </Pressable>
    </AppChrome>
  );
}
