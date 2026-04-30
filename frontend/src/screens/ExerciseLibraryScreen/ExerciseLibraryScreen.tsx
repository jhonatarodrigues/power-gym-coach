import { Text, View } from "react-native";

import { Button, ExerciseItem, Header, Screen, SectionTitle } from "@/components";
import { exerciseLibraryMock } from "@/repository/mock";
import { useAppTheme } from "@/theme";

export function ExerciseLibraryScreen() {
  const { theme } = useAppTheme();

  const customExercises = exerciseLibraryMock.filter((exercise) => exercise.isCustom);

  return (
    <Screen>
      <Header
        title="Exercise library"
        subtitle="Biblioteca base de exercicios para o professor selecionar ao montar o treino."
      />

      <SectionTitle
        title="Resumo"
        description="Catalogo reutilizavel com exercicios padrao e customizados."
      />
      <View style={{ gap: theme.spacing.md }}>
        <Text style={{ color: theme.colors.textMuted }}>
          Total de exercicios: {exerciseLibraryMock.length}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          Exercicios customizados: {customExercises.length}
        </Text>
      </View>

      <SectionTitle
        title="Lista de exercicios"
        description="Cada item pode ser escolhido na montagem do treino."
      />
      <View style={{ gap: theme.spacing.md }}>
        {exerciseLibraryMock.map((exercise) => (
          <ExerciseItem
            key={exercise.id}
            badgeLabel={exercise.isCustom ? "Custom" : "Base"}
            equipment={exercise.equipment}
            hasVideo={Boolean(exercise.demoVideoUrl)}
            instructions={exercise.instructions}
            muscleGroup={exercise.muscleGroup}
            name={exercise.name}
          />
        ))}
      </View>

      <Button label="Adicionar exercicio mockado" />
    </Screen>
  );
}
