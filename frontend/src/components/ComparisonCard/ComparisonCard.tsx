import { Text, View } from "react-native";

import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { useAppTheme } from "@/theme";

interface ComparisonCardProps {
  title: string;
  currentValue: string;
  previousValue: string;
  deltaLabel: string;
  trendLabel: string;
  tone?: "default" | "warning" | "success" | "info";
}

export function ComparisonCard({
  currentValue,
  deltaLabel,
  previousValue,
  title,
  tone = "info",
  trendLabel,
}: ComparisonCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.sm }}>
        <StatusBadge label={trendLabel} tone={tone} />
        <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{title}</Text>
        <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
          {currentValue}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          Antes: {previousValue}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>{deltaLabel}</Text>
      </View>
    </Card>
  );
}
