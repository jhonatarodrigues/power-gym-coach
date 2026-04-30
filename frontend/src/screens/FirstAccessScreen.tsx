import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import { Button, Card, Header, PasswordField, Screen, TextField } from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useAppTheme } from "@/theme";

interface FirstAccessFormValues {
  email: string;
  name: string;
  phone: string;
  avatarUrl: string;
  password: string;
}

export function FirstAccessScreen() {
  const { theme } = useAppTheme();
  const { completeFirstAccess, findInvitationByEmail } = useMockAuth();
  const [step, setStep] = useState<"email" | "profile">("email");
  const [emailLookup, setEmailLookup] = useState("");
  const invitation = useMemo(
    () => (emailLookup ? findInvitationByEmail(emailLookup) : null),
    [emailLookup, findInvitationByEmail]
  );

  const { control, handleSubmit, setValue, watch } = useForm<FirstAccessFormValues>({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      avatarUrl: "",
      password: "",
    },
  });

  const emailValue = watch("email");

  const handleEmailValidation = () => {
    setEmailLookup(emailValue);

    if (findInvitationByEmail(emailValue)) {
      setValue("name", findInvitationByEmail(emailValue)?.studentName ?? "");
      setStep("profile");
    }
  };

  const onSubmit = (values: FirstAccessFormValues) => {
    completeFirstAccess(values);
  };

  return (
    <Screen>
      <Header
        title="Primeiro acesso"
        subtitle="Digite seu email para localizar o convite enviado pelo professor e concluir seu cadastro."
      />

      <Card>
        <View style={{ gap: theme.spacing.lg }}>
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

          {step === "email" ? (
            <Button label="Validar convite" onPress={handleEmailValidation} />
          ) : null}

          {emailLookup && !invitation ? (
            <Text style={{ color: theme.colors.primary }}>
              Nao encontramos convite pendente para esse email.
            </Text>
          ) : null}
        </View>
      </Card>

      {step === "profile" && invitation ? (
        <Card>
          <View style={{ gap: theme.spacing.lg }}>
            <Text style={{ color: theme.colors.textMuted }}>
              Convite encontrado. Agora conclua seu cadastro.
            </Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextField label="Nome" onChangeText={onChange} value={value} />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <TextField label="Telefone ou WhatsApp" onChangeText={onChange} value={value} />
              )}
            />

            <Controller
              control={control}
              name="avatarUrl"
              render={({ field: { onChange, value } }) => (
                <TextField label="Foto" onChangeText={onChange} value={value} />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <PasswordField
                  hint="Minimo de 8 caracteres e pelo menos uma letra maiuscula."
                  label="Senha"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Button label="Concluir primeiro acesso" onPress={handleSubmit(onSubmit)} />
          </View>
        </Card>
      ) : null}
    </Screen>
  );
}
