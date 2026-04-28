import { Text, TextInput, TextInputProps, View } from "react-native";

import { useAppTheme } from "@/theme";

interface TextFieldProps extends TextInputProps {
  label?: string;
  hint?: string;
}

export function TextField({ label, hint, ...props }: TextFieldProps) {
  const { theme } = useAppTheme();

  return (
    <View style={{ gap: theme.spacing.sm, width: "100%" }}>
      {label ? (
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.body,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      ) : null}

      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        style={{
          backgroundColor: theme.colors.inputBackground,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          borderWidth: 1,
          color: theme.colors.text,
          fontSize: theme.typography.body,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
        }}
        {...props}
      />

      {hint ? (
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: theme.typography.caption,
          }}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
