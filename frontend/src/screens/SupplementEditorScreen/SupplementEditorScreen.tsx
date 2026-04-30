import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import {
  Button,
  Header,
  MacroSummaryCard,
  Screen,
  SectionTitle,
  SupplementCard,
  TextField,
} from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";

interface SupplementEditorFormValues {
  name: string;
  dosage: string;
  timing: string;
  observation: string;
  calories: string;
  carbs: string;
  protein: string;
  fat: string;
}

export function SupplementEditorScreen() {
  const { addSupplement, currentPlan } = useCurrentPlan();
  const { control, handleSubmit, reset } = useForm<SupplementEditorFormValues>({
    defaultValues: {
      name: "",
      dosage: "",
      timing: "",
      observation: "",
      calories: "0",
      carbs: "0",
      protein: "0",
      fat: "0",
    },
  });

  function onSubmit(values: SupplementEditorFormValues) {
    addSupplement({
      name: values.name.trim(),
      dosage: values.dosage.trim(),
      timing: values.timing.trim(),
      observation: values.observation.trim(),
      calories: Number(values.calories) || 0,
      carbs: Number(values.carbs) || 0,
      protein: Number(values.protein) || 0,
      fat: Number(values.fat) || 0,
      fiber: 0,
    });

    reset();
  }

  return (
    <Screen>
      <Header
        title="Supplement editor"
        subtitle="Fluxo mockado para cadastrar suplementos e refletir os totais do plano atual."
      />

      <SectionTitle
        title="Suplementos atuais"
        description="Preview sincronizado com o plano atual."
      />
      <View style={{ gap: 16 }}>
        {currentPlan.dietPlan.supplements.map((supplement) => (
          <SupplementCard key={supplement.id} supplement={supplement} />
        ))}
      </View>

      <SectionTitle
        title="Novo suplemento"
        description="Preencha os dados e adicione ao plano atual."
      />

      <Controller
        control={control}
        name="name"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            label="Nome"
            hint="Nome do suplemento."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="dosage"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            label="Dosagem"
            hint="Exemplo: 5 g ou 2 capsulas."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="timing"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            label="Horario"
            hint="Quando deve ser consumido."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="observation"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            label="Observacao"
            hint="Contexto adicional opcional."
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="calories"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            label="Calorias"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="carbs"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            label="Carboidratos"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="protein"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            label="Proteinas"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="fat"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            label="Gorduras"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button label="Adicionar suplemento" onPress={handleSubmit(onSubmit)} />

      <MacroSummaryCard
        title="Totais atualizados"
        calories={currentPlan.dietPlan.calories}
        carbs={currentPlan.dietPlan.carbs}
        protein={currentPlan.dietPlan.protein}
        fat={currentPlan.dietPlan.fat}
        note="Os totais do plano atual refletem suplementos adicionados neste editor."
      />
    </Screen>
  );
}
