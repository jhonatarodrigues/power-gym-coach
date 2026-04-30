import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import { Button, Header, Screen, SectionTitle, TextField, TrainingDayCard } from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { exerciseLibraryMock } from "@/repository/mock";
import { useAppTheme } from "@/theme";

interface TrainingEditorFormValues {
  selectedDayId: string;
  selectedExerciseId: string;
  sets: string;
  reps: string;
  restSeconds: string;
  executionNotes: string;
  dayNotes: string;
}

export function TrainingEditorScreen() {
  const { theme } = useAppTheme();
  const { currentPlan, addExerciseToDay, updateTrainingDayNotes } = useCurrentPlan();
  const [selectedDayId, setSelectedDayId] = useState(currentPlan.trainingPlan.days[0]?.id);
  const initialDayId = currentPlan.trainingPlan.days[0]?.id ?? "";
  const initialExerciseId = exerciseLibraryMock[0]?.id ?? "";
  const { control, handleSubmit, setValue, watch } =
    useForm<TrainingEditorFormValues>({
      defaultValues: {
        selectedDayId: initialDayId,
        selectedExerciseId: initialExerciseId,
        sets: "3",
        reps: "10-12",
        restSeconds: "60",
        executionNotes: "",
        dayNotes: currentPlan.trainingPlan.days[0]?.notes ?? "",
      },
    });
  const days = currentPlan.trainingPlan.days;

  const selectedDay = useMemo(
    () => days.find((day) => day.id === selectedDayId) ?? days[0],
    [days, selectedDayId]
  );

  const selectedExerciseId = watch("selectedExerciseId");
  const selectedExercise = useMemo(
    () =>
      exerciseLibraryMock.find((exercise) => exercise.id === selectedExerciseId) ??
      exerciseLibraryMock[0],
    [selectedExerciseId]
  );

  useEffect(() => {
    if (selectedDay) {
      setValue("selectedDayId", selectedDay.id);
      setValue("dayNotes", selectedDay.notes ?? "");
    }
  }, [selectedDay, setValue]);

  function onSubmit(values: TrainingEditorFormValues) {
    if (!selectedDay || !selectedExercise) {
      return;
    }

    updateTrainingDayNotes(selectedDay.id, values.dayNotes.trim());
    addExerciseToDay({
      dayId: selectedDay.id,
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      sets: values.sets.trim(),
      reps: values.reps.trim(),
      restSeconds: Number(values.restSeconds) || 0,
      executionNotes: values.executionNotes.trim(),
    });

    setValue("executionNotes", "");
    setValue("dayNotes", values.dayNotes.trim());
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
            onPress={() => {
              setSelectedDayId(day.id);
              setValue("selectedDayId", day.id);
            }}
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
            <SectionTitle
              title="Selecionar exercicio"
              description="Use a biblioteca mockada para adicionar um novo item ao dia."
            />
            <View style={{ gap: theme.spacing.sm }}>
              {exerciseLibraryMock.slice(0, 5).map((exercise) => (
                <Button
                  fullWidth={false}
                  key={exercise.id}
                  label={exercise.name}
                  onPress={() => setValue("selectedExerciseId", exercise.id)}
                  variant={
                    exercise.id === selectedExerciseId ? "primary" : "ghost"
                  }
                />
              ))}
            </View>

            <Controller
              control={control}
              name="sets"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextField
                  hint="Quantidade de series para o exercicio escolhido."
                  label="Series"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="reps"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextField
                  hint="Faixa de repeticoes ou tempo."
                  label="Repeticoes"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="restSeconds"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextField
                  hint="Tempo de descanso em segundos."
                  keyboardType="numeric"
                  label="Descanso"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="executionNotes"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextField
                  hint="Orientacao rapida para a execucao do exercicio."
                  label="Observacao do exercicio"
                  multiline
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="dayNotes"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextField
                  hint="Observacao geral do dia de treino."
                  label="Observacao do dia"
                  multiline
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Button label="Salvar e adicionar exercicio" onPress={handleSubmit(onSubmit)} />
          </View>
        </>
      ) : (
        <Text style={{ color: theme.colors.textMuted }}>Nenhum dia selecionado.</Text>
      )}
    </Screen>
  );
}
