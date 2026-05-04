import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface SectionTitleProps {
  title: string;
  description?: string;
  actionLabel?: string;
}

export function SectionTitle({
  title,
  description,
  actionLabel,
}: SectionTitleProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        gap: theme.spacing.sm,
        width: "100%",
      }}
    >
      <View style={{ flex: 1, gap: theme.spacing.xs }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.subtitle,
            fontWeight: "700",
            lineHeight: 26,
          }}
        >
          {title}
        </Text>
        {description ? (
          <Text
            style={{
              color: theme.colors.textMuted,
              fontSize: theme.typography.caption,
              lineHeight: 19,
            }}
          >
            {description}
          </Text>
        ) : null}
      </View>

      {actionLabel ? (
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: theme.colors.primaryMuted,
            borderRadius: theme.radius.pill,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 6,
          }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.typography.caption,
              fontWeight: "700",
            }}
          >
            {actionLabel}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
