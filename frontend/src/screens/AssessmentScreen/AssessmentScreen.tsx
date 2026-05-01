import { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";

import {
  Button,
  DecisionCard,
  Header,
  JourneyTimelineCard,
  PendingAlertCard,
  Screen,
  SectionTitle,
  TextField,
} from "@/components";
import { useAssessmentTimeline } from "@/hooks/useAssessmentTimeline";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useMockAuth } from "@/hooks/useMockAuth";
import type { RootStackParamList } from "@/navigation/types";
import { assessmentRepository, examRepository } from "@/repository";
import { useAppTheme } from "@/theme";

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
  const { session } = useMockAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isTeacher = session.accessLevel === "teacher";
  const { applyAssessmentSuggestedChanges } = useCurrentPlan();
  const { review, submission, submissions, timeline } = useAssessmentTimeline();
  const [studentFormVisible, setStudentFormVisible] = useState(false);
  const [teacherFormVisible, setTeacherFormVisible] = useState(false);
  const studentForm = useForm<StudentAssessmentFormValues>({
    defaultValues: {
      description: "",
    },
  });
  const teacherForm = useForm<TeacherReviewFormValues>({
    defaultValues: {
      summary: review?.summary ?? "",
      observations: review?.observations ?? "",
      suggestedChanges: review?.suggestedChanges ?? "",
    },
  });

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
  const canRequestFollowUpExam = isTeacher && Boolean(submission);

  return (
    <Screen>
      <Header
        title="Assessment"
        subtitle="Fluxo mockado de envio de imagens pelo aluno e devolutiva do coach."
      />

      <SectionTitle
        title={isTeacher ? "Material enviado pelo aluno" : "Seu envio atual"}
        description="Base para avaliacao corporal, ajuste de treino e dieta."
      />
      <DecisionCard
        badgeLabel={submission.status === "pending" ? "Pendente" : "Revisado"}
        description={`Imagens enviadas: ${submission.images.length}`}
        highlight={submission.description}
        title={isTeacher ? "Ultimo envio do aluno" : "Seu envio atual"}
      />

      <SectionTitle
        title={isTeacher ? "Devolutiva do coach" : "Feedback recebido"}
        description="Resumo e observacoes da ultima avaliacao."
      />
      <DecisionCard
        badgeLabel={hasReview ? "Com devolutiva" : "Aguardando"}
        description={
          hasReview
            ? review.observations
            : "O aluno ja enviou novo material e o proximo ajuste de plano ainda nao foi consolidado."
        }
        highlight={
          hasReview ? review.suggestedChanges : "Aguardando devolutiva do coach"
        }
        title={hasReview ? review.summary : "Feedback pendente"}
      />

      <PendingAlertCard
        actionLabel={isTeacher ? "Abrir formulario de revisao" : "Abrir formulario de envio"}
        count={pendingSubmissions}
        description={
          isTeacher
            ? "Itens que ainda exigem acao para fechar o ciclo de avaliacao e decidir o novo plano."
            : "Itens que ainda exigem acao para fechar o ciclo de avaliacao."
        }
        onActionPress={() =>
          isTeacher
            ? setTeacherFormVisible((current) => !current)
            : setStudentFormVisible((current) => !current)
        }
        title="Estado da jornada"
      />

      {teacherFormVisible && isTeacher ? (
        <View style={{ gap: theme.spacing.md }}>
          <SectionTitle
            title="Revisao rapida"
            description="Use este formulario para registrar a devolutiva do coach."
          />
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

      {studentFormVisible && !isTeacher ? (
        <View style={{ gap: theme.spacing.md }}>
          <SectionTitle
            title="Novo envio"
            description="Descreva como foi a resposta ao plano atual antes de enviar."
          />
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

      <SectionTitle
        title="Timeline da avaliacao"
        description="Linha do tempo da avaliacao atual e da devolutiva."
      />
      <View style={{ gap: theme.spacing.md }}>
        {timeline.map((item) => (
          <JourneyTimelineCard
            event={{
              id: item.id,
              date: item.date,
              domain: "assessment",
              title: isTeacher ? item.titleTeacher : item.titleStudent,
              description: item.description,
            }}
            key={item.id}
          />
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
                navigation.navigate("CoachPlanHub");
              }}
            />
            <Button
              label="Solicitar follow-up laboratorial"
              onPress={() => {
                if (!canRequestFollowUpExam || !submission) {
                  return;
                }

                examRepository.requestExam({
                  teacherId: submission.teacherId,
                  studentId: submission.studentId,
                  title: "Follow-up laboratorial pos-avaliacao",
                  note: review?.suggestedChanges ?? "Relacionar com a devolutiva atual.",
                });
                navigation.navigate("Exams");
              }}
              variant="ghost"
            />
            <Button
              label="Solicitar novas fotos"
              onPress={() => navigation.navigate("Exams")}
              variant="ghost"
            />
            <Button
              label="Abrir exames"
              onPress={() => navigation.navigate("Exams")}
              variant="ghost"
            />
          </>
        ) : (
          <>
            <Button
              label="Abrir formulario de avaliacao"
              onPress={() => setStudentFormVisible((current) => !current)}
            />
            <Button
              label="Ver plano atualizado"
              onPress={() =>
                navigation.navigate("StudentTabs", { screen: "StudentPlan" })
              }
              variant="ghost"
            />
            <Button
              label="Abrir exames"
              onPress={() => navigation.navigate("Exams")}
              variant="ghost"
            />
          </>
        )}
      </View>
    </Screen>
  );
}
