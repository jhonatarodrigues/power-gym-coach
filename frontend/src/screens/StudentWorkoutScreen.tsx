import { Text, View } from "react-native";
import { Clock3, Dumbbell, Flame } from "lucide-react-native";

import {
  Button,
  Card,
  EmptyState,
  Header,
  MetricCard,
  Screen,
  SectionTitle,
  WorkoutExerciseCheckItem,
} from "@/components";
import { useStudentTodayWorkout } from "@/hooks/useStudentTodayWorkout";
import { useAppTheme } from "@/theme";

export function StudentWorkoutScreen() {
  const { theme } = useAppTheme();
  const {
    completedCount,
    completionRate,
    isExerciseCompleted,
    resetDay,
    todayLabel,
    todayTraining,
    toggleExercise,
    totalExercises,
  } = useStudentTodayWorkout();

  if (!todayTraining) {
    return (
      <Screen>
        <Header
          title="Treino do dia"
          subtitle="Acompanhe aqui a leitura do treino diario e marque seus exercicios."
        />
        <EmptyState
          actionLabel="Voltar depois"
          description="Nenhum treino foi configurado para o dia atual."
          title="Sem treino para hoje"
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Treino do dia"
        subtitle="Acompanhe aqui a leitura do treino diario e marque seus exercicios."
      />

      <Card>
        <View style={{ gap: theme.spacing.md }}>
          <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>{todayLabel}</Text>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.subtitle, fontWeight: "700" }}>
            {todayTraining.title}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            {todayTraining.notes ?? "Sem observacao adicional para hoje."}
          </Text>
        </View>
      </Card>

      <View style={{ gap: theme.spacing.md }}>
        <MetricCard
          label="exercicios concluidos"
          value={`${completedCount}/${totalExercises}`}
          trend={`${completionRate}% do treino feito`}
        />
        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
              <Dumbbell color={theme.colors.primary} size={18} />
              <Text style={{ color: theme.colors.text }}>Foco do dia: {todayTraining.title}</Text>
            </View>
            <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
              <Clock3 color={theme.colors.primary} size={18} />
              <Text style={{ color: theme.colors.textMuted }}>
                {totalExercises} exercicios para completar hoje
              </Text>
            </View>
            <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
              <Flame color={theme.colors.primary} size={18} />
              <Text style={{ color: theme.colors.textMuted }}>
                Marque cada exercicio assim que finalizar a execucao.
              </Text>
            </View>
          </View>
        </Card>
      </View>

      <SectionTitle
        title="Checklist do treino"
        description="Toque no exercicio para marcar o que ja foi feito hoje."
      />

      <View style={{ gap: theme.spacing.md }}>
        {todayTraining.exercises.map((exercise) => (
          <WorkoutExerciseCheckItem
            checked={isExerciseCompleted(todayTraining.id, exercise.id)}
            hasVideo={Boolean(exercise.demoVideoUrl)}
            instructions={exercise.executionNotes}
            key={exercise.id}
            onPress={() => toggleExercise(todayTraining.id, exercise.id)}
            subtitle={`${exercise.sets}x${exercise.reps} • ${exercise.restSeconds}s`}
            title={exercise.exerciseName}
          />
        ))}
      </View>

      <View style={{ gap: theme.spacing.md }}>
        <Button
          label="Reiniciar marcacoes do dia"
          onPress={() => resetDay(todayTraining.id)}
          variant="ghost"
        />
      </View>
    </Screen>
  );
}
