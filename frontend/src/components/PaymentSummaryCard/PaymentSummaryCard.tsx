import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface PaymentSummaryCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function PaymentSummaryCard({
  icon,
  label,
  value,
}: PaymentSummaryCardProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 18,
        borderWidth: 1,
        flex: 1,
        gap: 10,
        paddingHorizontal: 14,
        paddingVertical: 14,
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.04)",
          borderRadius: theme.radius.pill,
          height: 34,
          justifyContent: "center",
          width: 34,
        }}
      >
        {icon}
      </View>
      <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700" }}>{value}</Text>
      <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{label}</Text>
    </View>
  );
}
