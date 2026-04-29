import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, Card, Header, Screen, SectionTitle } from "@/components";
import {
  assessmentReviewsMock,
  assessmentSubmissionsMock,
} from "@/repository/mock";
import { useMockAuth } from "@/hooks/useMockAuth";
import type { RootStackParamList } from "@/navigation/types";
import { useAppTheme } from "@/theme";

export function AssessmentScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isTeacher = session.accessLevel === "teacher";

  const submission = assessmentSubmissionsMock[0];
  const review = assessmentReviewsMock[0];

  return (
    <Screen>
      <Header
        title="Assessment"
        subtitle="Fluxo mockado de envio de imagens pelo aluno e devolutiva do professor."
      />

      <SectionTitle
        title={isTeacher ? "Material enviado pelo aluno" : "Seu envio atual"}
        description="Base para avaliacao corporal, ajuste de treino e dieta."
      />
      <Card>
        <View style={{ gap: theme.spacing.md }}>
          <Text style={{ color: theme.colors.text }}>{submission.description}</Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Imagens enviadas: {submission.images.length}
          </Text>
          <View style={{ gap: theme.spacing.sm }}>
            {submission.images.map((image) => (
              <View
                key={image.id}
                style={{
                  alignItems: "center",
                  backgroundColor: theme.colors.surfaceAlt,
                  borderRadius: theme.radius.md,
                  height: 100,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: theme.colors.textMuted }}>
                  {image.label ?? "Imagem"} mockada
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Card>

      <SectionTitle
        title={isTeacher ? "Devolutiva do professor" : "Feedback recebido"}
        description="Resumo e observacoes da ultima avaliacao."
      />
      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.body,
              fontWeight: "700",
            }}
          >
            {review.summary}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>{review.observations}</Text>
          {review.suggestedChanges ? (
            <Text style={{ color: theme.colors.primary }}>
              {review.suggestedChanges}
            </Text>
          ) : null}
        </View>
      </Card>

      <View style={{ gap: theme.spacing.md }}>
        {isTeacher ? (
          <>
            <Button label="Criar novo planejamento" />
            <Button label="Solicitar novas fotos" variant="ghost" />
            <Button label="Abrir exams" onPress={() => navigation.navigate("Exams")} variant="ghost" />
          </>
        ) : (
          <>
            <Button label="Enviar nova avaliacao mockada" />
            <Button label="Ver plano atualizado" variant="ghost" />
            <Button label="Abrir exams" onPress={() => navigation.navigate("Exams")} variant="ghost" />
          </>
        )}
      </View>
    </Screen>
  );
}
