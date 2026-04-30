import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

type StatusBadgeTone = "default" | "warning" | "success" | "info";

interface StatusBadgeProps {
  label: string;
  tone?: StatusBadgeTone;
}

function getToneColors(tone: StatusBadgeTone, colors: ReturnType<typeof useAppTheme>["theme"]["colors"]) {
  if (tone === "warning") {
    return {
      background: colors.primaryMuted,
      text: colors.primary,
    };
  }

  if (tone === "success") {
    return {
      background: colors.surfaceAlt,
      text: colors.text,
    };
  }

  if (tone === "info") {
    return {
      background: colors.inputBackground,
      text: colors.text,
    };
  }

  return {
    background: colors.surfaceAlt,
    text: colors.textMuted,
  };
}

export function StatusBadge({ label, tone = "default" }: StatusBadgeProps) {
  const { theme } = useAppTheme();
  const toneColors = getToneColors(tone, theme.colors);

  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: toneColors.background,
        borderRadius: theme.radius.pill,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
      }}
    >
      <Text
        style={{
          color: toneColors.text,
          fontSize: theme.typography.caption,
          fontWeight: "700",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
