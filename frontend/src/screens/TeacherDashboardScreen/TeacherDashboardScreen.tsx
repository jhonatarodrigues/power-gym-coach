import { Text, View } from "react-native";
import {
  AthleteListItem,
  BrandLogo,
  ComparisonCard,
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
import { currentPlanMock } from "@/repository/mock";

export function TeacherDashboardScreen() {
  const { theme } = useAppTheme();
  const { currentUser, studentInvitations } = useMockAuth();
  const { getTeacherExpectedRevenue, subscriptions, paymentRecords } = usePayments();
  const teacher = currentUser();

  const activeStudents = studentProfilesMock.length;
  const pendingExamRequests = examRequestsMock.filter(
    (request) => request.status === "pending"
  ).length;
  const reviewedAssessments = assessmentReviewsMock.length;
  const studentsInGracePeriod = subscriptions.filter(
    (subscription) => subscription.status === "gracePeriod"
  ).length;
  const activePlans = studentProfilesMock.filter(
    (student) => student.userId === currentPlanMock.studentId
  ).length;
  const monthlyRevenue = teacher ? getTeacherExpectedRevenue(teacher.id) : 0;
  const paidRecords = paymentRecords.filter((record) => record.status === "paid").length;
  const firstInvitation = studentInvitations.find(
    (invitation) => invitation.status === "pending"
  );

  return (
    <Screen>
      <Header
        showBackButton={false}
        showBrand
        title="Dashboard do coach"
        subtitle="Visao geral da carteira de alunos, pagamentos e operacao do dia."
      />

      <Card>
        <View style={{ gap: theme.spacing.md }}>
          <BrandLogo showWordmark subtitle="Painel do coach" />
          <SectionTitle
            title="Leitura de hoje"
            description="A dashboard do coach precisa responder rapido quem exige acao primeiro."
          />
          <View style={{ gap: theme.spacing.md }}>
            <ComparisonCard
              currentValue={String(activeStudents)}
              previousValue={String(activePlans)}
              deltaLabel="Relacao entre pessoas ativas e ciclos em andamento"
              trendLabel="Base acompanhada"
              title="Base acompanhada"
            />
            <ComparisonCard
              currentValue={String(paidRecords)}
              previousValue={String(studentsInGracePeriod)}
              deltaLabel="Comparativo entre receitas confirmadas e alunos em tolerancia"
              trendLabel="Saude financeira"
              title="Saude financeira"
            />
          </View>
        </View>
      </Card>

      <View style={{ gap: theme.spacing.md }}>
        <MetricCard
          label="feedbacks concluidos"
          value={String(reviewedAssessments)}
          trend="ultima revisao ha 1 dia"
        />
        <MetricCard
          label="planos ativos"
          value={String(activePlans)}
          trend="cada plano sempre pertence a um aluno"
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
        title="Carteira de alunos"
        description="Plano, dieta, treino e feedback sempre ficam dentro do contexto do aluno."
      />
      <View style={{ gap: theme.spacing.md }}>
        <AthleteListItem
          name="Marina Costa"
          focus="Hipertrofia com plano ativo, revisao de dieta e acompanhamento de exames."
          status="Prioridade alta"
        />
        <AthleteListItem
          name="Lucas Andrade"
          focus="Rotina de definicao com necessidade de organizar treino e aderencia."
          status="Acompanhamento em dia"
        />
      </View>

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

      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
            Como usar o painel
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Use o menu lateral para abrir alunos, pagamentos, planos, biblioteca, exames e avaliacoes.
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            A home do coach fica reservada para indicadores uteis e leitura rapida da operacao.
          </Text>
        </View>
      </Card>
    </Screen>
  );
}
