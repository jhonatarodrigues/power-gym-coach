import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

import { Card } from "@/components/Card";

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
}

export function MetricCard({ label, value, trend }: MetricCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.sm }}>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: theme.typography.caption,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 30,
            fontWeight: "800",
          }}
        >
          {value}
        </Text>
        {trend ? (
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.typography.caption,
              fontWeight: "700",
            }}
          >
            {trend}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}
