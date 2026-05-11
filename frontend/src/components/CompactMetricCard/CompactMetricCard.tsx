import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface CompactMetricCardProps {
  icon: ReactNode;
  label: string;
  trend?: string;
  trendTone?: "success" | "warning" | "muted";
  value: string;
}

export function CompactMetricCard({
  icon,
  label,
  trend,
  trendTone = "success",
  value,
}: CompactMetricCardProps) {
  const { theme } = useAppTheme();
  const trendColor =
    trendTone === "success"
      ? theme.colors.success
      : trendTone === "warning"
        ? theme.colors.warning
        : theme.colors.textMuted;

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        gap: 12,
        minHeight: 126,
        paddingHorizontal: 12,
        paddingVertical: 14,
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.04)",
          borderRadius: theme.radius.pill,
          height: 38,
          justifyContent: "center",
          width: 38,
        }}
      >
        {icon}
      </View>
      <View style={{ gap: 3 }}>
        <Text
          numberOfLines={1}
          style={{
            color: theme.colors.text,
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          {value}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: 12,
            lineHeight: 16,
          }}
        >
          {label}
        </Text>
      </View>
      {trend ? (
        <View style={{ marginTop: "auto" }}>
          <Text style={{ color: trendColor, fontSize: 11, fontWeight: "700" }}>{trend}</Text>
          <Text style={{ color: theme.colors.textMuted, fontSize: 11 }}>vs mês anterior</Text>
        </View>
      ) : null}
    </View>
  );
}
