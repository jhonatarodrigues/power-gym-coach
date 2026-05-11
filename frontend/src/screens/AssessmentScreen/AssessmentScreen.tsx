import { useState } from "react";
import { Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { CreditCard, House, Menu, MessageSquare, TestTubeDiagonal, Users } from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  Button,
  CycleStepper,
  TextField,
} from "@/components";
import { useAssessmentTimeline } from "@/hooks/useAssessmentTimeline";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useMockAuth } from "@/hooks/useMockAuth";
import { assessmentRepository, examRepository } from "@/repository";
import { useAppTheme } from "@/theme";
import type { RootStackParamList } from "@/navigation/types";

interface StudentAssessmentFormValues {
  description: string;
}

interface TeacherReviewFormValues {
  summary: string;
  observations: string;
  suggestedChanges: string;
}

export function AssessmentScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<any>();
  const { session } = useMockAuth();
  const isTeacher = session.accessLevel === "teacher";
  const { applyAssessmentSuggestedChanges } = useCurrentPlan();
  const { review, submission } = useAssessmentTimeline();
  const [studentFormVisible, setStudentFormVisible] = useState(false);
  const [teacherFormVisible, setTeacherFormVisible] = useState(false);
  const studentForm = useForm<StudentAssessmentFormValues>({ defaultValues: { description: "" } });
  const teacherForm = useForm<TeacherReviewFormValues>({
    defaultValues: {
      summary: review?.summary ?? "",
      observations: review?.observations ?? "",
      suggestedChanges: review?.suggestedChanges ?? "",
    },
  });

  if (!submission) {
    return (
      <AppChrome>
        <AppTopBar
          onBackPress={() => navigation.goBack()}
          showAvatar={false}
          showBack
          showBell={false}
          title="Avaliação"
        />
        <Text style={{ color: theme.colors.textMuted }}>
          Nenhuma avaliacao mockada disponivel no momento.
        </Text>
      </AppChrome>
    );
  }

  const headerName = "Juliana Mendes";

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
              active: true,
              icon: <CreditCard color={theme.colors.primary} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherPayments"),
            },
            {
              key: "messages",
              label: "Mensagens",
              icon: <MessageSquare color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("Messages"),
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
        subtitle={headerName}
        title="Avaliação"
      />

      <CycleStepper
        statusText="Em andamento"
        steps={[
          { key: "sent", label: "Enviado", tone: "done", value: "02/05" },
          { key: "review", label: "Em análise", tone: "active", value: "06/05" },
          { key: "feedback", label: "Feedback", tone: "upcoming", value: "Aguardando" },
          { key: "plan", label: "Novo plano", tone: "upcoming", value: "Em breve" },
        ]}
        title="Ciclo atual"
      />

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
        <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "600" }}>
          Último envio
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {submission.images.map((image) => (
            <Image
              key={image.id}
              source={{ uri: image.imageUrl }}
              style={{ borderRadius: 14, height: 72, width: 72 }}
            />
          ))}
          <View
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.surfaceAlt,
              borderRadius: 14,
              justifyContent: "center",
              width: 52,
            }}
          >
            <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>+2</Text>
          </View>
        </View>
        <Text style={{ color: theme.colors.textMuted, fontSize: 11.5 }}>
          02/05/2026 • 6 fotos • Descrição: resposta ao plano atual.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: "rgba(255,255,255,0.06)",
          borderRadius: 22,
          borderWidth: 1,
          gap: 8,
          padding: 16,
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "600" }}>
          Último feedback do coach
        </Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>08/05/2026</Text>
        <Text style={{ color: theme.colors.text, fontSize: 13.5 }}>
          {review?.summary ?? "Aguardando devolutiva do coach"}
        </Text>
        <Text style={{ color: theme.colors.primary, fontSize: 12.5, fontWeight: "600" }}>
          Ajustes sugeridos
        </Text>
      </View>

      {isTeacher ? (
        <>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Button
              fullWidth={false}
              label="Aplicar sugestoes ao plano atual"
              onPress={() => {
                if (!review) {
                  return;
                }

                applyAssessmentSuggestedChanges(review.summary, review.suggestedChanges);
              }}
              size="sm"
              variant="soft"
            />
            <Button
              fullWidth={false}
              label="Abrir formulario de revisao"
              onPress={() => setTeacherFormVisible((current) => !current)}
              size="sm"
              variant="soft"
            />
            <Button
              fullWidth={false}
              label="Solicitar novas fotos"
              onPress={() => null}
              size="sm"
              variant="soft"
            />
            <Button
              fullWidth={false}
              label="Solicitar follow-up laboratorial"
              onPress={() => {
                examRepository.requestExam({
                  teacherId: submission.teacherId,
                  studentId: submission.studentId,
                  title: "Follow-up laboratorial pos-avaliacao",
                  note: review?.suggestedChanges ?? "Relacionar com a devolutiva atual.",
                });
              }}
              size="sm"
              variant="soft"
            />
          </View>
          {teacherFormVisible ? (
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
                control={teacherForm.control}
                name="summary"
                rules={{ required: true }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextField
                    label="Resumo"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Escreva o resumo da avaliacao"
                    value={value}
                  />
                )}
              />
              <Controller
                control={teacherForm.control}
                name="observations"
                rules={{ required: true }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextField
                    label="Observacoes"
                    multiline
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Descreva observacoes tecnicas"
                    value={value}
                  />
                )}
              />
              <Controller
                control={teacherForm.control}
                name="suggestedChanges"
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextField
                    label="Sugestoes para o plano"
                    multiline
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Quais ajustes devem entrar no proximo planejamento?"
                    value={value}
                  />
                )}
              />
              <Button
                label="Salvar revisao mockada"
                onPress={teacherForm.handleSubmit((values) => {
                  assessmentRepository.createReview({
                    submissionId: submission.id,
                    teacherId: submission.teacherId,
                    summary: values.summary,
                    observations: values.observations,
                    suggestedChanges: values.suggestedChanges,
                    createdNewPlan: Boolean(values.suggestedChanges),
                  });
                  setTeacherFormVisible(false);
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
              label="Abrir formulario de avaliacao"
              onPress={() => null}
              size="sm"
              variant="soft"
            />
            <Button
              fullWidth={false}
              label="Ver plano atualizado"
              onPress={() => navigation.navigate("StudentPlan")}
              size="sm"
              variant="soft"
            />
            <Button
              fullWidth={false}
              label="Abrir formulario de envio"
              onPress={() => setStudentFormVisible((current) => !current)}
              size="sm"
              variant="soft"
            />
          </View>
          {studentFormVisible ? (
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
                control={studentForm.control}
                name="description"
                rules={{ required: true }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextField
                    label="Descricao da avaliacao"
                    multiline
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Ex.: melhor resposta no treino, energia, digestao e aderencia."
                    value={value}
                  />
                )}
              />
              <Button
                label="Enviar avaliacao mockada"
                onPress={studentForm.handleSubmit((values) => {
                  if (!session.currentUser) {
                    return;
                  }

                  assessmentRepository.submitAssessment({
                    studentId: session.currentUser.id,
                    teacherId: submission.teacherId,
                    description: values.description,
                  });
                  studentForm.reset();
                  setStudentFormVisible(false);
                })}
              />
            </View>
          ) : null}
        </>
      )}

      <Button
        label="Registrar nova avaliação"
        onPress={() => {
          if (isTeacher && review) {
            applyAssessmentSuggestedChanges(review.summary, review.suggestedChanges);
          }
        }}
      />
    </AppChrome>
  );
}
