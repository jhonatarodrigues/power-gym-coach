import { Text, View } from "react-native";

import type { TrainingDay } from "@/types";
import { useAppTheme } from "@/theme";

import { Card } from "./Card";
import { ExerciseItem } from "./ExerciseItem";

interface TrainingDayCardProps {
  day: TrainingDay;
}

export function TrainingDayCard({ day }: TrainingDayCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.md }}>
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
