import { Text, View } from "react-native";

import type { HistoryRecord } from "@/types";
import { useAppTheme } from "@/theme";

import { Card } from "@/components/Card";

interface HistoryCardProps {
  record: HistoryRecord;
}

export function HistoryCard({ record }: HistoryCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.sm }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              flex: 1,
              fontSize: theme.typography.body,
              fontWeight: "700",
            }}
          >
            {record.title}
          </Text>
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.typography.caption,
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {record.type}
          </Text>
        </View>
        {record.description ? (
          <Text style={{ color: theme.colors.textMuted }}>{record.description}</Text>
        ) : null}
        <Text style={{ color: theme.colors.textMuted }}>{record.date}</Text>
      </View>
    </Card>
  );
}
