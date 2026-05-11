import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface MealProgressRowProps {
  consumed: number;
  label: string;
  total: number;
}

export function MealProgressRow({
  consumed,
  label,
  total,
}: MealProgressRowProps) {
  const { theme } = useAppTheme();
  const progress = total > 0 ? Math.min(1, consumed / total) : 0;

  return (
    <View style={{ gap: 8 }}>
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.text, fontSize: 13 }}>{label}</Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
          {consumed} / {total} kcal
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: theme.radius.pill,
          height: 7,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.pill,
            height: "100%",
            width: `${Math.max(0, progress * 100)}%`,
          }}
        />
      </View>
      <Text
        style={{
          color: theme.colors.textMuted,
          fontSize: 11,
          textAlign: "right",
        }}
      >
        {Math.round(progress * 100)}%
      </Text>
    </View>
  );
}
