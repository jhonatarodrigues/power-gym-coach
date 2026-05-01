import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BrandLogo, Button, Card, PasswordField, Screen, TextField } from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import type { RootStackParamList } from "@/navigation/types";
import { useAppTheme } from "@/theme";

interface LoginFormValues {
  email: string;
  password: string;
}

const roleDefaults = {
  teacher: {
    email: "rafael@powergymcoach.app",
    password: "Rafael123",
  },
  student: {
    email: "marina@powergymcoach.app",
    password: "Marina123",
  },
} as const;

export function RoleSelectionScreen() {
  const { theme } = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signIn } = useMockAuth();
  const [selectedRole, setSelectedRole] = useState<"teacher" | "student">(
    "teacher"
  );
  const [loginError, setLoginError] = useState("");
  const { control, handleSubmit, reset } = useForm<LoginFormValues>({
    defaultValues: roleDefaults.teacher,
  });

  useEffect(() => {
    reset(roleDefaults[selectedRole]);
  }, [reset, selectedRole]);

  const onSubmit = (values: LoginFormValues) => {
    const success = signIn({
      accessLevel: selectedRole,
      email: values.email,
      password: values.password,
    });

    setLoginError(success ? "" : "Email, senha ou perfil selecionado invalidos.");
  };

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: "center", gap: theme.spacing.xl }}>
        <BrandLogo
          size="lg"
          subtitle="Entre com email e senha. Escolha acima se o acesso e de coach ou aluno."
        />

        <Card>
          <View style={{ gap: theme.spacing.lg }}>
            <View
              style={{
                backgroundColor: theme.colors.inputBackground,
                borderRadius: theme.radius.pill,
                flexDirection: "row",
                padding: theme.spacing.xs,
              }}
            >
              {[
                { label: "Coach", value: "teacher" as const },
                { label: "Aluno", value: "student" as const },
              ].map((role) => {
                const active = role.value === selectedRole;

                return (
                  <Pressable
                    key={role.value}
                    onPress={() => setSelectedRole(role.value)}
                    style={{
                      backgroundColor: active ? theme.colors.primary : "transparent",
                      borderRadius: theme.radius.pill,
                      flex: 1,
                      paddingVertical: theme.spacing.md,
                    }}
                  >
                    <Text
                      style={{
                        color: active ? "#0B0B0B" : theme.colors.text,
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      {role.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextField
                  autoCapitalize="none"
                  keyboardType="email-address"
                  label="Email"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <PasswordField label="Senha" onChangeText={onChange} value={value} />
              )}
            />

            {loginError ? (
              <Text style={{ color: theme.colors.primary }}>{loginError}</Text>
            ) : null}

            <Button label="Entrar" onPress={handleSubmit(onSubmit)} />
            {selectedRole === "student" ? (
              <Button
                label="Primeiro acesso do aluno"
                onPress={() => navigation.navigate("FirstAccess")}
                variant="ghost"
              />
            ) : null}
          </View>
        </Card>
      </View>
    </Screen>
  );
}
