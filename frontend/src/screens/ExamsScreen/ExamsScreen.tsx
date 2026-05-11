import { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { CreditCard, FileBadge2, FlaskConical, House, Menu, TestTubeDiagonal, Users } from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  Button,
  PaymentSummaryCard,
  TextField,
  TimelineEventRow,
} from "@/components";
import { useExamTimeline } from "@/hooks/useExamTimeline";
import { useMockAuth } from "@/hooks/useMockAuth";
import { examRepository } from "@/repository";
import { useAppTheme } from "@/theme";
import { formatDateBR } from "@/utils/dates";

interface ExamRequestFormValues {
  title: string;
  note: string;
}

interface ExamUploadFormValues {
  fileName: string;
}

interface ExamReviewFormValues {
  reviewNote: string;
}

export function ExamsScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<any>();
  const { session } = useMockAuth();
  const isTeacher = session.accessLevel === "teacher";
  const { pendingRequests, requests, reviewedRequests, uploads } = useExamTimeline();
  const [requestFormVisible, setRequestFormVisible] = useState(false);
  const [uploadFormVisible, setUploadFormVisible] = useState(false);
  const [reviewFormVisible, setReviewFormVisible] = useState(false);
  const requestForm = useForm<ExamRequestFormValues>({ defaultValues: { title: "", note: "" } });
  const uploadForm = useForm<ExamUploadFormValues>({ defaultValues: { fileName: "" } });
  const reviewForm = useForm<ExamReviewFormValues>({ defaultValues: { reviewNote: "" } });
  const latestSentRequest = requests.find((request) => request.status === "sent");
  const nextUploadTarget = requests.find((request) => request.status !== "reviewed");

  return (
    <AppChrome
      footer={
        <AppBottomNav
          items={[
            {
              key: "dashboard",
              label: "Dashboard",
              icon: <House color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate(isTeacher ? "TeacherHome" : "StudentHome"),
            },
            {
              key: "students",
              label: "Alunos",
              icon: <Users color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherStudent"),
            },
            {
              key: "payments",
              label: "Pagamentos",
              icon: <CreditCard color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherPayments"),
            },
            {
              key: "exams",
              label: "Exames",
              active: true,
              icon: <TestTubeDiagonal color={theme.colors.primary} size={21} strokeWidth={2.1} />,
            },
            {
              key: "more",
              label: "Mais",
              icon: <Menu color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.goBack(),
            },
          ]}
        />
      }
    >
      <AppTopBar
        avatarUrl={session.currentUser?.avatarUrl}
        onAvatarPress={() => navigation.navigate("Profile")}
        onBackPress={() => navigation.goBack()}
        showBack
        showBell={false}
        subtitle="Juliana Mendes"
        title="Exames"
      />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <PaymentSummaryCard
          icon={<Users color={theme.colors.primary} size={16} strokeWidth={2.2} />}
          label="Solicitados"
          value={String(requests.length)}
        />
        <PaymentSummaryCard
          icon={<FlaskConical color={theme.colors.primary} size={16} strokeWidth={2.2} />}
          label="Enviados"
          value={String(uploads.length)}
        />
        <PaymentSummaryCard
          icon={<FileBadge2 color={theme.colors.success} size={16} strokeWidth={2.2} />}
          label="Revisados"
          value={String(reviewedRequests.length)}
        />
      </View>

      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: "rgba(255,255,255,0.06)",
          borderRadius: 22,
          borderWidth: 1,
          gap: 14,
          padding: 16,
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "600" }}>
          Linha do tempo
        </Text>
        <View>
          {requests.map((request) => (
            <TimelineEventRow
              color={
                request.status === "reviewed"
                  ? theme.colors.success
                  : request.status === "sent"
                    ? theme.colors.primary
                    : "#4A91F3"
              }
              date={formatDateBR(request.requestedAt)}
              key={request.id}
              subtitle={request.reviewNote ?? request.note ?? "Aguardando revisão"}
              title={request.title}
            />
          ))}
        </View>
      </View>

      {uploads.length > 0 ? (
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: "rgba(255,255,255,0.06)",
            borderRadius: 22,
            borderWidth: 1,
            gap: 10,
            padding: 16,
          }}
        >
          <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "600" }}>
            Uploads recebidos
          </Text>
          {uploads.map((upload) => (
            <Text key={upload.id} style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
              {upload.fileName}
            </Text>
          ))}
        </View>
      ) : null}

      {isTeacher ? (
        <>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Button
              fullWidth={false}
              label="Abrir formulario de solicitacao"
              onPress={() => setRequestFormVisible((current) => !current)}
              size="sm"
              variant="soft"
            />
            <Button
              fullWidth={false}
              label="Abrir solicitacao"
              onPress={() => setRequestFormVisible((current) => !current)}
              size="sm"
              variant="soft"
            />
            <Button
              fullWidth={false}
              label="Abrir revisao do ultimo exame enviado"
              onPress={() => setReviewFormVisible((current) => !current)}
              size="sm"
              variant="soft"
            />
          </View>
          {requestFormVisible ? (
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: "rgba(255,255,255,0.06)",
                borderRadius: 22,
                borderWidth: 1,
                gap: 12,
                padding: 16,
              }}
            >
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

          {reviewFormVisible && latestSentRequest ? (
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: "rgba(255,255,255,0.06)",
                borderRadius: 22,
                borderWidth: 1,
                gap: 12,
                padding: 16,
              }}
            >
              <Controller
                control={reviewForm.control}
                name="reviewNote"
                rules={{ required: true }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextField
                    label="Feedback da revisao"
                    multiline
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Descreva a leitura do exame e os proximos passos."
                    value={value}
                  />
                )}
              />
              <Button
                label="Salvar revisao do exame"
                onPress={reviewForm.handleSubmit((values) => {
                  examRepository.reviewExam({
                    examRequestId: latestSentRequest.id,
                    reviewNote: values.reviewNote,
                  });
                  reviewForm.reset();
                  setReviewFormVisible(false);
                })}
              />
            </View>
          ) : null}
        </>
      ) : (
        <>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Button
              fullWidth={false}
              label="Abrir formulario de upload"
              onPress={() => setUploadFormVisible((current) => !current)}
              size="sm"
              variant="soft"
            />
            <Button
              fullWidth={false}
              label="Abrir upload"
              onPress={() => setUploadFormVisible((current) => !current)}
              size="sm"
              variant="soft"
            />
            <Button
              fullWidth={false}
              label="Ver plano atual"
              onPress={() => navigation.navigate("StudentPlan")}
              size="sm"
              variant="soft"
            />
          </View>
          {uploadFormVisible ? (
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: "rgba(255,255,255,0.06)",
                borderRadius: 22,
                borderWidth: 1,
                gap: 12,
                padding: 16,
              }}
            >
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
        </>
      )}

      <Button
        label="Solicitar novo exame"
        onPress={() => setRequestFormVisible((current) => !current)}
      />
    </AppChrome>
  );
}
