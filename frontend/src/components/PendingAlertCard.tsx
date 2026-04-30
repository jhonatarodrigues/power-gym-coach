import { Text, View } from "react-native";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useAppTheme } from "@/theme";

interface PendingAlertCardProps {
  title: string;
  count: number;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function PendingAlertCard({
  actionLabel,
  count,
  description,
  onActionPress,
  title,
}: PendingAlertCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.sm }}>
        <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>{title}</Text>
        <Text style={{ color: theme.colors.text, fontSize: theme.typography.title }}>
          {count}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>{description}</Text>
        {actionLabel && onActionPress ? (
          <Button label={actionLabel} onPress={onActionPress} />
        ) : null}
      </View>
    </Card>
  );
}
