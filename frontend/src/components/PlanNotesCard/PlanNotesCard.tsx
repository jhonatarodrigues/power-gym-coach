import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface PlanNotesCardProps {
  items: string[];
}

export function PlanNotesCard({ items }: PlanNotesCardProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 20,
        borderWidth: 1,
        gap: 12,
        padding: 16,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "700" }}>
        Observações do plano
      </Text>
      <View style={{ gap: 8 }}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Text key={`${item}-${index}`} style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
              • {item}
            </Text>
          ))
        ) : (
          <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
            Nenhuma observação cadastrada para este ciclo.
          </Text>
        )}
      </View>
    </View>
  );
}
