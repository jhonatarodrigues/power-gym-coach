import { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";

import {
  Button,
  Header,
  JourneyTimelineCard,
  PendingAlertCard,
  Screen,
  SectionTitle,
  StatusBadge,
  TextField,
} from "@/components";
import { useExamTimeline } from "@/hooks/useExamTimeline";
import { useMockAuth } from "@/hooks/useMockAuth";
import type { RootStackParamList } from "@/navigation/types";
import { examRepository } from "@/repository";
import { useAppTheme } from "@/theme";

interface ExamRequestFormValues {
  title: string;
  note: string;
}

interface ExamUploadFormValues {
  fileName: string;
}

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
  const [requestFormVisible, setRequestFormVisible] = useState(false);
  const [uploadFormVisible, setUploadFormVisible] = useState(false);
  const requestForm = useForm<ExamRequestFormValues>({
    defaultValues: {
      title: "",
      note: "",
    },
  });
  const uploadForm = useForm<ExamUploadFormValues>({
    defaultValues: {
      fileName: "",
    },
  });
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
      <PendingAlertCard
        actionLabel={isTeacher ? "Abrir solicitacao" : "Abrir upload"}
        count={requests.filter((request) => request.status !== "reviewed").length}
        description="Exames que ainda exigem acao para fechar o ciclo de revisao."
        onActionPress={() =>
          isTeacher
            ? setRequestFormVisible((current) => !current)
            : setUploadFormVisible((current) => !current)
        }
        title="Estado atual"
      />

      {requestFormVisible && isTeacher ? (
        <View style={{ gap: theme.spacing.md }}>
          <SectionTitle
            title="Nova solicitacao"
            description="Defina o exame e a orientacao que o aluno deve seguir."
          />
          <Controller
            control={requestForm.control}
            name="title"
            rules={{ required: true }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                label="Titulo do exame"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Ex.: Ferritina + vitamina B12"
                value={value}
              />
            )}
          />
          <Controller
            control={requestForm.control}
            name="note"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                label="Orientacao"
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Descreva o motivo e quando enviar."
                value={value}
              />
            )}
          />
          <Button
            label="Criar solicitacao mockada"
            onPress={requestForm.handleSubmit((values) => {
              if (!session.currentUser) {
                return;
              }

              examRepository.requestExam({
                teacherId: session.currentUser.id,
                studentId: requests[0]?.studentId ?? "user-student-1",
                title: values.title,
                note: values.note,
              });
              requestForm.reset();
              setRequestFormVisible(false);
            })}
          />
        </View>
      ) : null}

      {uploadFormVisible && !isTeacher ? (
        <View style={{ gap: theme.spacing.md }}>
          <SectionTitle
            title="Novo upload"
            description="Escolha um nome de arquivo mockado para anexar o exame."
          />
          <Controller
            control={uploadForm.control}
            name="fileName"
            rules={{ required: true }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                label="Nome do arquivo"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="exame-abril-2026.pdf"
                value={value}
              />
            )}
          />
          <Button
            label="Enviar upload mockado"
            onPress={uploadForm.handleSubmit((values) => {
              if (!session.currentUser || !nextUploadTarget) {
                return;
              }

              examRepository.uploadExam({
                examRequestId: nextUploadTarget.id,
                studentId: session.currentUser.id,
                fileName: values.fileName,
              });
              uploadForm.reset();
              setUploadFormVisible(false);
            })}
          />
        </View>
      ) : null}

      <View style={{ gap: theme.spacing.md }}>
        {requests.map((request) => {
          const requestUploads = uploads.filter(
            (upload) => upload.examRequestId === request.id
          );

          return (
            <JourneyTimelineCard
              event={{
                id: request.id,
                date: request.requestedAt.slice(0, 10),
                domain: "exam",
                title: request.title,
                description: request.note ?? "Sem observacao adicional.",
                highlight: `Uploads vinculados: ${requestUploads.length}`,
              }}
              key={request.id}
            />
          );
        })}
      </View>

      <SectionTitle
        title="Status por exame"
        description="Leitura rapida do status de cada solicitacao."
      />
      <View style={{ gap: theme.spacing.md }}>
        {requests.map((request) => {
          const requestUploads = uploads.filter(
            (upload) => upload.examRequestId === request.id
          );

          return (
            <View
              key={`status-${request.id}`}
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.md,
                borderWidth: 1,
                gap: theme.spacing.sm,
                padding: theme.spacing.lg,
              }}
            >
              <StatusBadge
                label={getStatusLabel(request.status)}
                tone={
                  request.status === "pending"
                    ? "warning"
                    : request.status === "sent"
                      ? "info"
                      : "success"
                }
              />
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                  {request.title}
                </Text>
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
            </View>
          );
        })}
      </View>

      <SectionTitle
        title="Timeline de exames"
        description="Solicitacoes e uploads recentes em ordem cronologica."
      />
      <View style={{ gap: theme.spacing.md }}>
        {timeline.map((item) => (
          <JourneyTimelineCard
            event={{ ...item, domain: "exam" }}
            key={item.id}
          />
        ))}
      </View>

      <View style={{ gap: theme.spacing.md }}>
        {isTeacher ? (
          <>
            <Button
              label="Abrir formulario de solicitacao"
              onPress={() => setRequestFormVisible((current) => !current)}
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
              label="Abrir formulario de upload"
              onPress={() => setUploadFormVisible((current) => !current)}
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
