import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  AthleteListItem,
  Button,
  Card,
  Header,
  MetricCard,
  Screen,
  SectionTitle,
} from "@/components";
import {
  assessmentReviewsMock,
  examRequestsMock,
  studentProfilesMock,
} from "@/repository/mock";
import { useMockAuth } from "@/hooks/useMockAuth";
import { usePayments } from "@/hooks/usePayments";
import { useAppTheme } from "@/theme";
import type { RootStackParamList } from "@/navigation/types";

export function TeacherDashboardScreen() {
  const { theme } = useAppTheme();
  const { currentUser, signInAs, signOut, studentInvitations } = useMockAuth();
  const { getTeacherExpectedRevenue, subscriptions } = usePayments();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const teacher = currentUser();

  const activeStudents = studentProfilesMock.length;
  const pendingExamRequests = examRequestsMock.filter(
    (request) => request.status === "pending"
  ).length;
  const reviewedAssessments = assessmentReviewsMock.length;
  const studentsInGracePeriod = subscriptions.filter(
    (subscription) => subscription.status === "gracePeriod"
  ).length;
  const monthlyRevenue = teacher ? getTeacherExpectedRevenue(teacher.id) : 0;
  const firstInvitation = studentInvitations.find(
    (invitation) => invitation.status === "pending"
  );

  return (
    <Screen>
      <Header
        showBackButton={false}
        title="Dashboard do professor"
        subtitle="Visao geral da carteira de alunos, pagamentos e operacao do dia."
      />

      <MetricCard
        label="alunos ativos"
        value={String(activeStudents)}
        trend="acompanhamento ativo na base mockada"
      />

      <View style={{ gap: theme.spacing.md }}>
        <MetricCard
          label="avaliacoes revisadas"
          value={String(reviewedAssessments)}
          trend="ultima revisao ha 1 dia"
        />
        <MetricCard
          label="exames pendentes"
          value={String(pendingExamRequests)}
          trend="1 solicitacao aguardando envio"
        />
        <MetricCard
          label="recebimento previsto"
          value={`R$ ${monthlyRevenue.toFixed(2)}`}
          trend="estimativa mensal dos planos ativos"
        />
        <MetricCard
          label="pagamentos em tolerancia"
          value={String(studentsInGracePeriod)}
          trend="alunos com 3 dias para regularizar"
        />
      </View>

      <SectionTitle
        title="Aluno em destaque"
        description="A vitrine principal aqui e o aluno, nao um plano isolado."
      />
      <AthleteListItem
        name="Marina Costa"
        focus="Hipertrofia com revisao de dieta, treino por dias e pendencia financeira em prazo."
        status="Acompanhamento ativo"
      />

      {firstInvitation ? (
        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
              Link de primeiro acesso gerado
            </Text>
            <Text style={{ color: theme.colors.textMuted }}>
              {firstInvitation.studentEmail}
            </Text>
            <Text style={{ color: theme.colors.primary }}>
              {firstInvitation.firstAccessLink}
            </Text>
          </View>
        </Card>
      ) : null}

      <View style={{ gap: theme.spacing.md }}>
        <Button
          label="Abrir dados do aluno"
          onPress={() =>
            navigation.navigate("TeacherTabs", {
              screen: "TeacherHome",
              params: { screen: "TeacherStudentTab" },
            })
          }
        />
        <Button label="Abrir pagamentos" onPress={() => navigation.navigate("Payments")} />
        <Button label="Abrir perfil" onPress={() => navigation.navigate("Profile")} variant="ghost" />
        <Button label="Abrir editor de dieta" onPress={() => navigation.navigate("DietEditor")} />
        <Button
          label="Abrir editor de treino"
          onPress={() => navigation.navigate("TrainingEditor")}
          variant="ghost"
        />
        <Button
          label="Abrir editor de suplementacao"
          onPress={() => navigation.navigate("SupplementEditor")}
          variant="ghost"
        />
        <Button
          label="Abrir avaliacao"
          onPress={() => navigation.navigate("Assessment")}
          variant="ghost"
        />
        <Button
          label="Abrir exames"
          onPress={() => navigation.navigate("Exams")}
          variant="ghost"
        />
        <Button label="Trocar para visao do aluno" onPress={() => signInAs("student")} />
        <Button label="Selecionar perfil" onPress={signOut} variant="ghost" />
      </View>
    </Screen>
  );
}
