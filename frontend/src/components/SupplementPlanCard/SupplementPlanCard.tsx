import { Text, View } from "react-native";

import type { Supplement } from "@/types";
import { useAppTheme } from "@/theme";

interface SupplementPlanCardProps {
  supplements: Supplement[];
}

export function SupplementPlanCard({ supplements }: SupplementPlanCardProps) {
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
      <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "700" }}>
        Suplementação
      </Text>
      <View style={{ gap: 10 }}>
        {supplements.length > 0 ? (
          supplements.map((supplement) => (
            <View
              key={supplement.id}
              style={{
                borderTopColor: "rgba(255,255,255,0.06)",
                borderTopWidth: 1,
                gap: 4,
                paddingTop: 10,
              }}
            >
              <Text style={{ color: theme.colors.text, fontSize: 13.5, fontWeight: "600" }}>
                {supplement.name}
              </Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                {supplement.dosage} • {supplement.timing}
              </Text>
              {supplement.observation ? (
                <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
                  {supplement.observation}
                </Text>
              ) : null}
            </View>
          ))
        ) : (
          <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
            Nenhum suplemento definido para este plano.
          </Text>
        )}
      </View>
    </View>
  );
}
