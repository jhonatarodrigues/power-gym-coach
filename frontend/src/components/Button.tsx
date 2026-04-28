import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import { useAppTheme } from "@/theme";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = true,
}: ButtonProps) {
  const { theme } = useAppTheme();
  const isGhost = variant === "ghost";

  const containerStyle: ViewStyle = {
    backgroundColor: isGhost ? "transparent" : theme.colors.primary,
    borderColor: isGhost ? theme.colors.border : theme.colors.primary,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? "100%" : undefined,
  };

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          borderRadius: theme.radius.pill,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
        },
        containerStyle,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isGhost ? theme.colors.text : "#0B0B0B"} />
      ) : (
        <Text
          style={{
            color: isGhost ? theme.colors.text : "#0B0B0B",
            fontSize: theme.typography.button,
            fontWeight: "700",
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
