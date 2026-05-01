import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  TextStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { useAppTheme } from "@/theme";

type ButtonVariant = "primary" | "ghost" | "soft";
type ButtonSize = "md" | "sm";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  rightIcon?: ReactNode;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = true,
  rightIcon,
}: ButtonProps) {
  const { theme } = useAppTheme();
  const isGhost = variant === "ghost";
  const isSoft = variant === "soft";

  const containerStyle: ViewStyle = {
    backgroundColor: isGhost
      ? "transparent"
      : isSoft
        ? theme.colors.primaryMuted
        : theme.colors.primary,
    borderColor: isGhost
      ? theme.colors.border
      : isSoft
        ? "transparent"
        : theme.colors.primary,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? "100%" : undefined,
  };

  const sizeStyle: ViewStyle = {
    borderRadius: theme.radius.pill,
    paddingHorizontal: size === "sm" ? theme.spacing.lg : theme.spacing.xl,
    paddingVertical: size === "sm" ? theme.spacing.sm : theme.spacing.md,
  };

  const labelStyle: TextStyle = {
    color: isGhost || isSoft ? theme.colors.text : "#0B0B0B",
    fontSize: size === "sm" ? theme.typography.caption : theme.typography.button,
    fontWeight: "700",
  };

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        sizeStyle,
        containerStyle,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isGhost || isSoft ? theme.colors.text : "#0B0B0B"} />
      ) : (
        <View style={styles.content}>
          <Text style={labelStyle}>{label}</Text>
          {rightIcon ? <View style={styles.iconSlot}>{rightIcon}</View> : null}
        </View>
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
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  iconSlot: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
