import { View } from "react-native";

import { Button, Card, Header, Screen } from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useAppTheme } from "@/theme";

export function RoleSelectionScreen() {
  const { theme } = useAppTheme();
  const { signInAs } = useMockAuth();

  return (
    <Screen scrollable={false}>
      <View style={{ flex: 1, justifyContent: "center", gap: theme.spacing.xl }}>
        <Header
          title="Power Gym Coach"
          subtitle="Escolha um perfil mockado para navegar no app e validar os primeiros fluxos."
        />

        <Card>
          <View style={{ gap: theme.spacing.lg }}>
            <Button label="Entrar como professor" onPress={() => signInAs("teacher")} />
            <Button
              label="Entrar como aluno"
              onPress={() => signInAs("student")}
              variant="ghost"
            />
          </View>
        </Card>
      </View>
    </Screen>
  );
}
