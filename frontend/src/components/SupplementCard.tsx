import { Text, View } from "react-native";

import type { Supplement } from "@/types";
import { useAppTheme } from "@/theme";

import { Card } from "./Card";

interface SupplementCardProps {
  supplement: Supplement;
}

export function SupplementCard({ supplement }: SupplementCardProps) {
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
          {supplement.name}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          {supplement.dosage} / {supplement.timing}
        </Text>
        {supplement.observation ? (
          <Text style={{ color: theme.colors.textMuted }}>
            {supplement.observation}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}
