import { Image, Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import { Button, Card, Header, PasswordField, Screen, TextField } from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useAppTheme } from "@/theme";

interface ProfileFormValues {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  avatarUrl: string;
}

export function ProfileScreen() {
  const { theme } = useAppTheme();
  const { currentUser, updateCurrentUserProfile } = useMockAuth();
  const user = currentUser();

  const { control, handleSubmit, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      cpf: user?.cpf ?? "",
      phone: user?.phone ?? "",
      password: "",
      avatarUrl: user?.avatarUrl ?? "",
    },
  });

  const avatarUrl = watch("avatarUrl");

  const onSubmit = (values: ProfileFormValues) => {
    updateCurrentUserProfile({
      name: values.name,
      phone: values.phone,
      password: values.password || undefined,
      avatarUrl: values.avatarUrl,
    });
  };

  return (
    <Screen>
      <Header
        title="Seu perfil"
        subtitle="Atualize os dados permitidos e mantenha suas informacoes sempre em dia."
      />

      <Card>
        <View style={{ alignItems: "center", gap: theme.spacing.md }}>
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{
                borderRadius: 48,
                height: 96,
                width: 96,
              }}
            />
          ) : null}
          <Text style={{ color: theme.colors.textMuted, textAlign: "center" }}>
            Foto alteravel por URL nesta fase mockada.
          </Text>
        </View>
      </Card>

      <Card>
        <View style={{ gap: theme.spacing.lg }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextField label="Nome" onChangeText={onChange} value={value} />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <TextField
                editable={false}
                hint="O email nao pode ser alterado."
                label="Email"
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="cpf"
            render={({ field: { value } }) => (
              <TextField
                editable={false}
                hint="O CPF nao pode ser alterado."
                label="CPF"
                value={value}
              />
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
            name="password"
            render={({ field: { onChange, value } }) => (
              <PasswordField
                hint="Minimo de 8 caracteres e pelo menos uma letra maiuscula."
                label="Nova senha"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="avatarUrl"
            render={({ field: { onChange, value } }) => (
              <TextField
                hint="Use uma URL de imagem para simular a troca da foto."
                label="Foto"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Button label="Salvar perfil" onPress={handleSubmit(onSubmit)} />
        </View>
      </Card>
    </Screen>
  );
}
