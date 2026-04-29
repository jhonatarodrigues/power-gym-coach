import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, Card, Header, Screen, SectionTitle } from "@/components";
import { mockAssessmentRepository } from "@/repository/mock";
import { useMockAuth } from "@/hooks/useMockAuth";
import type { RootStackParamList } from "@/navigation/types";
import { useAppTheme } from "@/theme";

export function AssessmentScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isTeacher = session.accessLevel === "teacher";

  const submissions = mockAssessmentRepository.listSubmissions();
  const reviews = mockAssessmentRepository.listReviews();
  const submission = submissions[0];
  const review = reviews[0];

  const timeline = [
    {
      id: submission.id,
      date: submission.submittedAt.slice(0, 10),
      title: isTeacher ? "Aluno enviou avaliacao" : "Voce enviou avaliacao",
      description: submission.description,
    },
    {
      id: review.id,
      date: review.reviewedAt.slice(0, 10),
      title: isTeacher ? "Devolutiva registrada" : "Professor revisou sua avaliacao",
      description: review.summary,
    },
  ];

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

      <SectionTitle
        title="Timeline da avaliacao"
        description="Linha do tempo da avaliacao atual e da devolutiva."
      />
      <View style={{ gap: theme.spacing.md }}>
        {timeline.map((item) => (
          <Card key={item.id}>
            <View style={{ gap: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                {item.date}
              </Text>
              <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                {item.title}
              </Text>
              <Text style={{ color: theme.colors.textMuted }}>
                {item.description}
              </Text>
            </View>
          </Card>
        ))}
      </View>

      <View style={{ gap: theme.spacing.md }}>
        {isTeacher ? (
          <>
            <Button
              label="Criar novo planejamento"
              onPress={() =>
                navigation.navigate("TeacherTabs", { screen: "TeacherPlanTab" })
              }
            />
            <Button
              label="Solicitar novas fotos"
              onPress={() => navigation.navigate("Exams")}
              variant="ghost"
            />
            <Button
              label="Abrir exams"
              onPress={() => navigation.navigate("Exams")}
              variant="ghost"
            />
          </>
        ) : (
          <>
            <Button label="Enviar nova avaliacao mockada" />
            <Button
              label="Ver plano atualizado"
              onPress={() =>
                navigation.navigate("StudentTabs", { screen: "StudentPlanTab" })
              }
              variant="ghost"
            />
            <Button
              label="Abrir exams"
              onPress={() => navigation.navigate("Exams")}
              variant="ghost"
            />
          </>
        )}
      </View>
    </Screen>
  );
}
