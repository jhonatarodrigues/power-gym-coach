import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
}: EmptyStateProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ alignItems: "flex-start", gap: theme.spacing.md }}>
        <View
          style={{
            backgroundColor: theme.colors.primaryMuted,
            borderRadius: theme.radius.pill,
            height: 48,
            width: 48,
          }}
        />
        <View style={{ gap: theme.spacing.sm }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.subtitle,
              fontWeight: "700",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontSize: theme.typography.body,
            }}
          >
            {description}
          </Text>
        </View>
        {actionLabel ? <Button fullWidth={false} label={actionLabel} /> : null}
      </View>
    </Card>
  );
}
