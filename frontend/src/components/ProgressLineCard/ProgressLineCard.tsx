import { Text, View } from "react-native";

import { Card } from "@/components/Card";
import { useAppTheme } from "@/theme";

interface ProgressLineCardProps {
  title: string;
  currentLabel: string;
  targetLabel?: string;
  helper?: string;
  progress: number;
  tone?: "primary" | "success" | "warning";
}

const toneMap = {
  primary: "primary",
  success: "success",
  warning: "warning",
} as const;

export function ProgressLineCard({
  title,
  currentLabel,
  targetLabel,
  helper,
  progress,
  tone = "primary",
}: ProgressLineCardProps) {
  const { theme } = useAppTheme();
  const clampedProgress = Math.max(0, Math.min(progress, 1));
  const toneColor = theme.colors[toneMap[tone]];

  return (
    <Card>
      <View style={{ gap: theme.spacing.md }}>
        <View
          style={{
            alignItems: "flex-start",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: theme.spacing.md,
          }}
        >
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.body,
                fontWeight: "700",
                lineHeight: 22,
              }}
            >
              {title}
            </Text>
            {helper ? (
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontSize: theme.typography.caption,
                  lineHeight: 18,
                }}
              >
                {helper}
              </Text>
            ) : null}
          </View>
          <View style={{ alignItems: "flex-end", gap: theme.spacing.xs }}>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 24,
                fontWeight: "800",
                letterSpacing: -0.3,
              }}
            >
              {currentLabel}
            </Text>
            {targetLabel ? (
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontSize: theme.typography.caption,
                  textAlign: "right",
                }}
              >
                {targetLabel}
              </Text>
            ) : null}
          </View>
        </View>

        <View
          style={{
            backgroundColor: theme.colors.surfaceAlt,
            borderRadius: theme.radius.pill,
            height: 12,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              backgroundColor: toneColor,
              borderRadius: theme.radius.pill,
              height: "100%",
              width: `${clampedProgress * 100}%`,
            }}
          />
        </View>

        <Text
          style={{
            color: toneColor,
            fontSize: theme.typography.caption,
            fontWeight: "700",
          }}
        >
          {Math.round(clampedProgress * 100)}% concluido
        </Text>
      </View>
    </Card>
  );
}
