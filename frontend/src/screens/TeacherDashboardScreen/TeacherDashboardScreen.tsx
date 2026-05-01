import { Text, View } from "react-native";
import { AlertCircle, ArrowUpRight, Wallet } from "lucide-react-native";
import {
  AthleteListItem,
  Card,
  DashboardHero,
  Header,
  MiniBarChart,
  ProgressLineCard,
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
  const totalRecords = paymentRecords.length;
  const firstInvitation = studentInvitations.find(
    (invitation) => invitation.status === "pending"
  );
  const financialProgress = totalRecords > 0 ? paidRecords / totalRecords : 0;
  const attentionProgress =
    activeStudents > 0 ? (pendingExamRequests + studentsInGracePeriod) / activeStudents : 0;
  const operationChartItems = [
    { label: "Alunos", value: activeStudents, hint: "ativos" },
    { label: "Aval.", value: reviewedAssessments, hint: "review" },
    { label: "Exames", value: pendingExamRequests, hint: "pend." },
    { label: "Pagos", value: paidRecords, hint: "ok" },
  ];

  return (
    <Screen>
      <Header
        showBackButton={false}
        showBrand
        title="Dashboard do coach"
        subtitle="Visao operacional da carteira, com foco no que exige acao hoje."
      />

      <DashboardHero
        accentLabel="Visao rapida de operacao"
        eyebrow="Coach"
        stats={[
          { label: "Alunos ativos", value: String(activeStudents) },
          { label: "Planos ativos", value: String(activePlans) },
          { label: "Recebimento", value: `R$ ${monthlyRevenue.toFixed(0)}` },
        ]}
        subtitle="Tudo que e treino, dieta, feedback e plano continua dentro do contexto do aluno. Aqui ficam apenas os sinais mais importantes da operacao."
        title="Painel mais limpo para decidir rapido"
      />

      <View style={{ gap: theme.spacing.md }}>
        <ProgressLineCard
          currentLabel={`${paidRecords}/${totalRecords || 0}`}
          helper="Proporcao entre cobrancas ja liquidadas e cobrancas abertas do ciclo."
          progress={financialProgress}
          targetLabel="cobrancas pagas"
          title="Saude financeira"
        />
        <ProgressLineCard
          currentLabel={`${Math.round(attentionProgress * 100)}%`}
          helper="Soma de exames pendentes e alunos em tolerancia financeira."
          progress={attentionProgress}
          targetLabel="risco na carteira"
          title="Itens que pedem atencao"
          tone="warning"
        />
      </View>

      <MiniBarChart
        description="Mini grafico para leitura imediata dos pilares mais importantes do dia."
        items={operationChartItems}
        title="Panorama da operacao"
      />

      <SectionTitle
        title="Acoes prioritarias"
        description="O coach deve conseguir entender rapido quem precisa de cuidado primeiro."
      />
      <Card>
        <View style={{ gap: theme.spacing.md }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: theme.spacing.sm,
            }}
          >
            <AlertCircle color={theme.colors.warning} size={18} />
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
              {pendingExamRequests} exames aguardam retorno e {studentsInGracePeriod} aluno(s)
              estao em tolerancia.
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: theme.spacing.sm,
            }}
          >
            <Wallet color={theme.colors.primary} size={18} />
            <Text style={{ color: theme.colors.textMuted, flex: 1 }}>
              O ciclo atual projeta R$ {monthlyRevenue.toFixed(2)} em recebimento recorrente.
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: theme.spacing.sm,
            }}
          >
            <ArrowUpRight color={theme.colors.success} size={18} />
            <Text style={{ color: theme.colors.textMuted, flex: 1 }}>
              {reviewedAssessments} feedback(s) ja foram revisados e a base segue com {activePlans}{" "}
              plano(s) em andamento.
            </Text>
          </View>
        </View>
      </Card>

      <SectionTitle
        title="Carteira de alunos"
        description="A stack principal continua sendo aluno, plano, dieta, treino e feedback."
      />
      <Card>
        <View style={{ gap: theme.spacing.lg }}>
          <AthleteListItem
            name="Marina Costa"
            focus="Hipertrofia com revisao de dieta, treino atual e exames pendentes."
            status="Prioridade alta"
            withDivider
          />
          <AthleteListItem
            name="Lucas Andrade"
            focus="Plano em acompanhamento com rotina mais estavel e menor risco no dia."
            status="Operacao estavel"
          />
        </View>
      </Card>

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
    </Screen>
  );
}
