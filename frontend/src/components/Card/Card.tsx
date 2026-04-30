import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { useAppTheme } from "@/theme";

interface CardProps extends PropsWithChildren {
  padded?: boolean;
}

export function Card({ children, padded = true }: CardProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          padding: padded ? theme.spacing.lg : 0,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    width: "100%",
  },
});
