import { Text, View } from "react-native";

import { Button, Card, Header, MetricCard, Screen, SectionTitle, StatusBadge } from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { usePayments } from "@/hooks/usePayments";
import { useAppTheme } from "@/theme";
import { formatDateBR } from "@/utils/dates";
import { formatCurrency, getPaymentStatusLabel, getPaymentStatusTone } from "@/utils/payments";

export function PaymentsScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const {
    getOpenRecordsByUser,
    getPaymentStatusByStudent,
    getTeacherExpectedRevenue,
    payRecord,
    paymentRecords,
    subscriptions,
    teacherPlans,
  } = usePayments();

  const currentUser = session.currentUser;
  const isTeacher = session.accessLevel === "teacher";

  if (!currentUser) {
    return null;
  }

  const openRecords = getOpenRecordsByUser(currentUser.id);

  if (isTeacher) {
    const expectedRevenue = getTeacherExpectedRevenue(currentUser.id);
    const teacherRecords = paymentRecords.filter(
      (record) => record.teacherId === currentUser.id && record.kind === "studentPlan"
    );
    const paidStudents = teacherRecords.filter((record) => record.status === "paid").length;

    return (
      <Screen>
        <Header
          title="Pagamentos"
          subtitle="Acompanhe previsao de recebimento, alunos pagantes e os planos cadastrados."
        />

        <MetricCard
          label="recebimento mensal previsto"
          value={formatCurrency(expectedRevenue)}
          trend="soma das mensalidades ativas do professor"
        />

        <MetricCard
          label="pagamentos confirmados"
          value={String(paidStudents)}
          trend="parcelas ja confirmadas neste mock"
        />

        <SectionTitle
          title="Planos do professor"
          description="Mensal, trimestral e anual sempre cobrados mes a mes."
        />
        <View style={{ gap: theme.spacing.md }}>
          {teacherPlans.map((plan) => (
            <Card key={plan.id}>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{plan.name}</Text>
                <Text style={{ color: theme.colors.textMuted }}>{plan.description}</Text>
                <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                  {formatCurrency(plan.monthlyAmount)}/mes
                </Text>
              </View>
            </Card>
          ))}
        </View>

        <SectionTitle
          title="Alunos e pagamentos"
          description="Visao rapida de quem ja pagou e quem ainda exige acao."
        />
        <View style={{ gap: theme.spacing.md }}>
          {subscriptions.map((subscription) => (
            <Card key={subscription.id}>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                  Aluna em foco do mock
                </Text>
                <StatusBadge
                  label={getPaymentStatusLabel(subscription.status)}
                  tone={getPaymentStatusTone(subscription.status)}
                />
                <Text style={{ color: theme.colors.textMuted }}>
                  Proximo vencimento: {formatDateBR(subscription.nextDueDate)}
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  Tolerancia ate: {formatDateBR(subscription.graceUntilDate)}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </Screen>
    );
  }

  const currentStatus = getPaymentStatusByStudent(currentUser.id);

  return (
    <Screen>
      <Header
        title="Seus pagamentos"
        subtitle="Acompanhe a mensalidade da plataforma e a cobranca do seu plano com o professor."
      />

      {currentStatus ? (
        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
              Situacao atual da conta
            </Text>
            <StatusBadge
              label={getPaymentStatusLabel(currentStatus)}
              tone={getPaymentStatusTone(currentStatus)}
            />
            <Text style={{ color: theme.colors.textMuted }}>
              Em caso de atraso, voce tem 3 dias para regularizar antes da inativacao.
            </Text>
          </View>
        </Card>
      ) : null}

      <SectionTitle
        title="Pendencias abertas"
        description="Escolha Pix ou cartao para regularizar seus pagamentos."
      />
      <View style={{ gap: theme.spacing.md }}>
        {openRecords.map((record) => (
          <Card key={record.id}>
            <View style={{ gap: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{record.title}</Text>
              <Text style={{ color: theme.colors.textMuted }}>{record.description}</Text>
              <Text style={{ color: theme.colors.textMuted }}>
                Referencia: {record.referenceMonth}
              </Text>
              <Text style={{ color: theme.colors.textMuted }}>
                Vencimento: {formatDateBR(record.dueDate)}
              </Text>
              <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                {formatCurrency(record.amount)}
              </Text>
              <View style={{ gap: theme.spacing.sm }}>
                <Button label="Pagar com Pix" onPress={() => payRecord(record.id, "pix")} />
                <Button
                  label="Pagar com cartao"
                  onPress={() => payRecord(record.id, "card")}
                  variant="ghost"
                />
              </View>
            </View>
          </Card>
        ))}
      </View>

      <SectionTitle
        title="Historico"
        description="Registros ja liquidados na conta do aluno."
      />
      <View style={{ gap: theme.spacing.md }}>
        {paymentRecords
          .filter((record) => record.userId === currentUser.id)
          .map((record) => (
            <Card key={record.id}>
              <View style={{ gap: theme.spacing.xs }}>
                <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{record.title}</Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  {formatCurrency(record.amount)} · {getPaymentStatusLabel(record.status)}
                </Text>
              </View>
            </Card>
          ))}
      </View>
    </Screen>
  );
}
