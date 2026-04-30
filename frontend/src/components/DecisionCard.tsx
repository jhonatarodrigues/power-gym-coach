import { Text, View } from "react-native";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { useAppTheme } from "@/theme";

interface DecisionCardProps {
  title: string;
  description: string;
  highlight?: string;
  badgeLabel?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function DecisionCard({
  actionLabel,
  badgeLabel,
  description,
  highlight,
  onActionPress,
  title,
}: DecisionCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.sm }}>
        {badgeLabel ? <StatusBadge label={badgeLabel} tone="warning" /> : null}
        <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{title}</Text>
        <Text style={{ color: theme.colors.textMuted }}>{description}</Text>
        {highlight ? (
          <Text style={{ color: theme.colors.primary }}>{highlight}</Text>
        ) : null}
        {actionLabel && onActionPress ? (
          <Button label={actionLabel} onPress={onActionPress} variant="ghost" />
        ) : null}
      </View>
    </Card>
  );
}
