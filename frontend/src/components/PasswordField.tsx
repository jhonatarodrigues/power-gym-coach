import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TextInputProps } from "react-native";

import { useAppTheme } from "@/theme";

import { TextField } from "./TextField";

type PasswordFieldProps = Omit<TextInputProps, "secureTextEntry"> & {
  label?: string;
  hint?: string;
};

export function PasswordField(props: PasswordFieldProps) {
  const { theme } = useAppTheme();
  const [hidden, setHidden] = useState(true);

  return (
    <View style={{ gap: theme.spacing.sm, width: "100%" }}>
      <TextField {...props} secureTextEntry={hidden} />
      <Pressable onPress={() => setHidden((current) => !current)}>
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: theme.typography.caption,
            fontWeight: "700",
          }}
        >
          {hidden ? "Mostrar senha" : "Ocultar senha"}
        </Text>
      </Pressable>
    </View>
  );
}
