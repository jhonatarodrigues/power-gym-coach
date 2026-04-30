import { Text, View } from "react-native";
import { CalendarDays } from "lucide-react-native";

import type { TrainingDay } from "@/types";
import { useAppTheme } from "@/theme";
import { getWeekdayLabel } from "@/utils/weekdays";

import { Card } from "@/components/Card";
import { ExerciseItem } from "@/components/ExerciseItem";

interface TrainingDayCardProps {
  day: TrainingDay;
}

export function TrainingDayCard({ day }: TrainingDayCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.md }}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
          <CalendarDays color={theme.colors.primary} size={18} />
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.typography.caption,
              fontWeight: "700",
            }}
          >
            {getWeekdayLabel(day.weekday)}
          </Text>
        </View>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.body,
            fontWeight: "700",
          }}
        >
          {day.title}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          {day.exercises.length} exercicios
        </Text>
        {day.notes ? (
          <Text style={{ color: theme.colors.textMuted }}>{day.notes}</Text>
        ) : null}
        <View style={{ gap: theme.spacing.sm }}>
          {day.exercises.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              equipment="exercise"
              hasVideo={Boolean(exercise.demoVideoUrl)}
              instructions={exercise.executionNotes}
              muscleGroup={`${exercise.sets}x${exercise.reps}`}
              name={exercise.exerciseName}
            />
          ))}
        </View>
      </View>
    </Card>
  );
}
