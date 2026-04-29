import { Text, View } from "react-native";

import { Button, Card, Header, Screen, SectionTitle } from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { examRequestsMock, examUploadsMock } from "@/repository/mock";
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
  const isTeacher = session.accessLevel === "teacher";
  const currentUserId = session.currentUser?.id;

  const examRequests = examRequestsMock.filter((request) =>
    currentUserId ? request.studentId === currentUserId || isTeacher : true
  );

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

      <View style={{ gap: theme.spacing.md }}>
        {examRequests.map((request) => {
          const uploads = examUploadsMock.filter(
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
                  Uploads vinculados: {uploads.length}
                </Text>

                {uploads.length > 0 ? (
                  <View style={{ gap: theme.spacing.xs }}>
                    {uploads.map((upload) => (
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

      <View style={{ gap: theme.spacing.md }}>
        {isTeacher ? (
          <>
            <Button label="Solicitar novo exame" />
            <Button label="Marcar como revisado" variant="ghost" />
          </>
        ) : (
          <>
            <Button label="Enviar exame mockado" />
            <Button label="Ver historico de envios" variant="ghost" />
          </>
        )}
      </View>
    </Screen>
  );
}
