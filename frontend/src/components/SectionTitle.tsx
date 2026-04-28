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
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <View style={{ flex: 1, gap: theme.spacing.xs }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.subtitle,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
        {description ? (
          <Text
            style={{
              color: theme.colors.textMuted,
              fontSize: theme.typography.caption,
            }}
          >
            {description}
          </Text>
        ) : null}
      </View>

      {actionLabel ? (
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: theme.typography.caption,
            fontWeight: "700",
          }}
        >
          {actionLabel}
        </Text>
      ) : null}
    </View>
  );
}
