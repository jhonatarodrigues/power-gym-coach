import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, Card, Header, Screen, SectionTitle } from "@/components";
import { useExamTimeline } from "@/hooks/useExamTimeline";
import { useMockAuth } from "@/hooks/useMockAuth";
import type { RootStackParamList } from "@/navigation/types";
import { examRepository } from "@/repository/examRepository";
import { useAppTheme } from "@/theme";

function getStatusLabel(status: "pending" | "sent" | "reviewed") {
  if (status === "pending") {
    return "Pendente";
  }

  if (status === "sent") {
    return "Enviado";
  }

  return "Revisado";
}

export function ExamsScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isTeacher = session.accessLevel === "teacher";
  const { requests, timeline, uploads } = useExamTimeline();
  const nextUploadTarget = requests.find((request) => request.status !== "reviewed");
  const latestSentRequest = requests.find((request) => request.status === "sent");

  return (
    <Screen>
      <Header
        title="Exams"
        subtitle="Area mockada para acompanhar solicitacoes, envios e revisoes de exames."
      />

      <SectionTitle
        title={isTeacher ? "Solicitacoes do aluno" : "Suas solicitacoes"}
        description={
          isTeacher
            ? "Pedidos abertos e historico recente de exames enviados."
            : "Veja o que precisa ser enviado e o que ja foi anexado."
        }
      />
      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
            Estado atual
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Pendentes: {requests.filter((request) => request.status === "pending").length}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Enviados: {requests.filter((request) => request.status === "sent").length}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Revisados: {requests.filter((request) => request.status === "reviewed").length}
          </Text>
        </View>
      </Card>

      <View style={{ gap: theme.spacing.md }}>
        {requests.map((request) => {
          const requestUploads = uploads.filter(
            (upload) => upload.examRequestId === request.id
          );

          return (
            <Card key={request.id}>
              <View style={{ gap: theme.spacing.sm }}>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.text,
                      flex: 1,
                      fontSize: theme.typography.body,
                      fontWeight: "700",
                    }}
                  >
                    {request.title}
                  </Text>
                  <Text
                    style={{
                      color:
                        request.status === "pending"
                          ? theme.colors.primary
                          : theme.colors.textMuted,
                      fontSize: theme.typography.caption,
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  >
                    {getStatusLabel(request.status)}
                  </Text>
                </View>

                {request.note ? (
                  <Text style={{ color: theme.colors.textMuted }}>
                    {request.note}
                  </Text>
                ) : null}

                <Text style={{ color: theme.colors.textMuted }}>
                  Solicitado em: {request.requestedAt.slice(0, 10)}
                </Text>

                <Text style={{ color: theme.colors.textMuted }}>
                  Uploads vinculados: {requestUploads.length}
                </Text>

                {requestUploads.length > 0 ? (
                  <View style={{ gap: theme.spacing.xs }}>
                    {requestUploads.map((upload) => (
                      <Text key={upload.id} style={{ color: theme.colors.primary }}>
                        {upload.fileName}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            </Card>
          );
        })}
      </View>

      <SectionTitle
        title="Timeline de exames"
        description="Solicitacoes e uploads recentes em ordem cronologica."
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
              label="Solicitar novo exame mockado"
              onPress={() => {
                if (!session.currentUser) {
                  return;
                }

                examRepository.requestExam({
                  teacherId: session.currentUser.id,
                  studentId: requests[0]?.studentId ?? "user-student-1",
                  title: "Ferritina + vitamina B12",
                  note: "Solicitacao mockada para revisar fadiga, energia e recuperacao.",
                });
              }}
            />
            <Button
              label="Marcar ultimo exame enviado como revisado"
              onPress={() => {
                if (!latestSentRequest) {
                  return;
                }

                examRepository.updateRequestStatus(latestSentRequest.id, "reviewed");
              }}
              variant="ghost"
            />
            <Button
              label="Voltar ao plano atual"
              onPress={() =>
                navigation.navigate("TeacherTabs", { screen: "TeacherPlanTab" })
              }
              variant="ghost"
            />
          </>
        ) : (
          <>
            <Button
              label="Enviar exame mockado"
              onPress={() => {
                if (!session.currentUser || !nextUploadTarget) {
                  return;
                }

                examRepository.uploadExam({
                  examRequestId: nextUploadTarget.id,
                  studentId: session.currentUser.id,
                  fileName: `upload-mock-${Date.now()}.pdf`,
                });
              }}
            />
            <Button
              label="Ver plano atual"
              onPress={() =>
                navigation.navigate("StudentTabs", { screen: "StudentPlanTab" })
              }
              variant="ghost"
            />
          </>
        )}
      </View>
    </Screen>
  );
}
