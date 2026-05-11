import { Text, View } from "react-native";
import { Clock3, PlayCircle } from "lucide-react-native";

import type { TrainingDay } from "@/types";
import { useAppTheme } from "@/theme";
import { getWeekdayLabel } from "@/utils/weekdays";

interface TrainingDaySectionProps {
  day: TrainingDay;
}

export function TrainingDaySection({ day }: TrainingDaySectionProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 20,
        borderWidth: 1,
        gap: 14,
        padding: 16,
      }}
    >
      <View style={{ gap: 4 }}>
        <Text style={{ color: theme.colors.primary, fontSize: 11.5, fontWeight: "700" }}>
          {getWeekdayLabel(day.weekday)}
        </Text>
        <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "700" }}>{day.title}</Text>
        {day.notes ? (
          <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>{day.notes}</Text>
        ) : null}
      </View>

      <View style={{ gap: 10 }}>
        {day.exercises.length > 0 ? (
          day.exercises.map((exercise) => (
            <View
              key={exercise.id}
              style={{
                borderTopColor: "rgba(255,255,255,0.06)",
                borderTopWidth: 1,
                gap: 6,
                paddingTop: 10,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: theme.colors.text, flex: 1, fontSize: 13.5, fontWeight: "600" }}>
                  {exercise.order}. {exercise.exerciseName}
                </Text>
                {exercise.demoVideoUrl ? (
                  <PlayCircle color={theme.colors.primary} size={16} strokeWidth={2.1} />
                ) : null}
              </View>

              <View style={{ alignItems: "center", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                  {exercise.sets} séries
                </Text>
                <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{exercise.reps} reps</Text>
                <View style={{ alignItems: "center", flexDirection: "row", gap: 4 }}>
                  <Clock3 color={theme.colors.textMuted} size={12} strokeWidth={2} />
                  <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                    {exercise.restSeconds}s
                  </Text>
                </View>
              </View>

              {exercise.executionNotes ? (
                <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
                  Execução: {exercise.executionNotes}
                </Text>
              ) : null}
              {exercise.loadNotes ? (
                <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
                  Carga: {exercise.loadNotes}
                </Text>
              ) : null}
            </View>
          ))
        ) : (
          <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
            Nenhum exercício cadastrado para este dia.
          </Text>
        )}
      </View>
    </View>
  );
}
