import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, Header, Screen, TextField } from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import type { RootStackParamList } from "@/navigation/types";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useAppTheme } from "@/theme";
import { normalizeDateInputToISO } from "@/utils/dates";

interface PlanFormValues {
  title: string;
  startDate: string;
  endDate: string;
}

export function CoachPlanCreateScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selectedStudent = useCoachContextStore((state) => state.getSelectedStudent());
  const createPlan = useCoachContextStore((state) => state.createPlan);
  const { loadCurrentPlan } = useCurrentPlan();
  const { control, handleSubmit } = useForm<PlanFormValues>({
    defaultValues: {
      title: "Novo plano",
      startDate: "01/05/2026",
      endDate: "01/06/2026",
    },
  });

  if (!selectedStudent) {
    return null;
  }

  return (
    <Screen>
      <Header
        title="Cadastrar plano"
        subtitle={`Novo ciclo para ${selectedStudent.user.name}.`}
      />

      <View style={{ gap: theme.spacing.md }}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Nome do plano"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Data inicial"
              onChangeText={onChange}
              placeholder="dd/mm/aaaa"
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Data final"
              onChangeText={onChange}
              placeholder="dd/mm/aaaa"
              value={value}
            />
          )}
        />
        <Button
          label="Criar plano e abrir estrutura"
          onPress={handleSubmit((values) => {
            const plan = createPlan({
              studentId: selectedStudent.user.id,
              title: values.title,
              startDate: normalizeDateInputToISO(values.startDate),
              endDate: normalizeDateInputToISO(values.endDate),
            });
            loadCurrentPlan(plan);
            navigation.navigate("CoachPlanHub");
          })}
        />
      </View>
    </Screen>
  );
}
