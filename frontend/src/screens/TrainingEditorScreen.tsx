import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import { Button, Header, Screen, SectionTitle, TrainingDayCard } from "@/components";
import { currentPlanMock } from "@/repository/mock";
import { useAppTheme } from "@/theme";

export function TrainingEditorScreen() {
  const { theme } = useAppTheme();
  const [selectedDayId, setSelectedDayId] = useState(
    currentPlanMock.trainingPlan.days[0]?.id
  );
  const [days, setDays] = useState(currentPlanMock.trainingPlan.days);

  const selectedDay = useMemo(
    () => days.find((day) => day.id === selectedDayId) ?? days[0],
    [days, selectedDayId]
  );

  function addMockExercise() {
    if (!selectedDay) {
      return;
    }

    setDays((currentDays) =>
      currentDays.map((day) => {
        if (day.id !== selectedDay.id) {
          return day;
        }

        const nextOrder = day.exercises.length + 1;

        return {
          ...day,
          exercises: [
            ...day.exercises,
            {
              id: `mock-training-exercise-${day.id}-${nextOrder}`,
              exerciseId: "exercise-1",
              exerciseName: `Exercicio extra ${nextOrder}`,
              sets: "3",
              reps: "10-12",
              restSeconds: 60,
              executionNotes: "Exercicio adicionado localmente no editor mockado.",
              order: nextOrder,
            },
          ],
        };
      })
    );
  }

  return (
    <Screen>
      <Header
        title="Training editor"
        subtitle="Edicao mockada do treino por dia da semana para validar o fluxo do professor."
      />

      <SectionTitle
        title="Selecionar dia"
        description="Escolha um dia para editar o treino atual."
      />
      <View style={{ gap: theme.spacing.sm }}>
        {days.map((day) => (
          <Button
            fullWidth={false}
            key={day.id}
            label={day.title}
            onPress={() => setSelectedDayId(day.id)}
            variant={day.id === selectedDayId ? "primary" : "ghost"}
          />
        ))}
      </View>

      {selectedDay ? (
        <>
          <SectionTitle
            title="Preview do dia"
            description="Estado local do dia selecionado."
          />
          <TrainingDayCard day={selectedDay} />

          <View style={{ gap: theme.spacing.md }}>
            <Button label="Adicionar exercicio mockado" onPress={addMockExercise} />
            <Button
              label="Atualizar observacao do dia"
              onPress={() =>
                setDays((currentDays) =>
                  currentDays.map((day) =>
                    day.id === selectedDay.id
                      ? {
                          ...day,
                          notes: "Observacao alterada localmente no editor mockado.",
                        }
                      : day
                  )
                )
              }
              variant="ghost"
            />
          </View>
        </>
      ) : (
        <Text style={{ color: theme.colors.textMuted }}>Nenhum dia selecionado.</Text>
      )}
    </Screen>
  );
}
