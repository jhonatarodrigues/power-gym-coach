import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

import { Card } from "@/components/Card";

interface MacroSummaryCardProps {
  title: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  note?: string;
}

export function MacroSummaryCard({
  title,
  calories,
  carbs,
  protein,
  fat,
  note,
}: MacroSummaryCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.sm }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.body,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
        <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
          {calories.toFixed(0)} kcal
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          Carboidratos: {carbs.toFixed(1)} g
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          Proteinas: {protein.toFixed(1)} g
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          Gorduras: {fat.toFixed(1)} g
        </Text>
        {note ? <Text style={{ color: theme.colors.textMuted }}>{note}</Text> : null}
      </View>
    </Card>
  );
}
