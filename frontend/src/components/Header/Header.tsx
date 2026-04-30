import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { theme } = useAppTheme();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.title,
          fontWeight: "800",
        }}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: theme.typography.body,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
