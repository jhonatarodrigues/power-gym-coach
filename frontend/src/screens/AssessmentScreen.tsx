import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, Card, Header, Screen, SectionTitle } from "@/components";
import { useAssessmentTimeline } from "@/hooks/useAssessmentTimeline";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useMockAuth } from "@/hooks/useMockAuth";
import type { RootStackParamList } from "@/navigation/types";
import { assessmentRepository } from "@/repository/assessmentRepository";
import { useAppTheme } from "@/theme";

export function AssessmentScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isTeacher = session.accessLevel === "teacher";
  const { applyAssessmentSuggestedChanges } = useCurrentPlan();
  const { review, submission, submissions, timeline } = useAssessmentTimeline();

  if (!submission) {
    return (
      <Screen>
        <Header
          title="Assessment"
          subtitle="Nenhuma avaliacao mockada disponivel no momento."
        />
      </Screen>
    );
  }

  const pendingSubmissions = submissions.filter((item) => item.status === "pending").length;
  const hasReview = Boolean(review);

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
          {hasReview ? (
            <>
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
            </>
          ) : (
            <>
              <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                Aguardando devolutiva do professor
              </Text>
              <Text style={{ color: theme.colors.textMuted }}>
                O aluno ja enviou novo material e o proximo ajuste de plano ainda nao foi consolidado.
              </Text>
            </>
          )}
        </View>
      </Card>

      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
            Estado da jornada
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Avaliacoes pendentes de revisao: {pendingSubmissions}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Planejamento pode ser atualizado diretamente a partir desta devolutiva.
          </Text>
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
                {isTeacher ? item.titleTeacher : item.titleStudent}
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
              label="Aplicar sugestoes ao plano atual"
              onPress={() => {
                if (!review) {
                  return;
                }

                applyAssessmentSuggestedChanges(
                  review.summary,
                  review.suggestedChanges
                );
                navigation.navigate("TeacherTabs", { screen: "TeacherPlanTab" });
              }}
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
            <Button
              label="Enviar nova avaliacao mockada"
              onPress={() => {
                if (!session.currentUser) {
                  return;
                }

                assessmentRepository.submitAssessment({
                  studentId: session.currentUser.id,
                  teacherId: submission.teacherId,
                  description:
                    "Nova avaliacao mockada enviada pelo aluno para revisar resposta ao plano atual.",
                });
              }}
            />
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
