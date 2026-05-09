import { useState } from "react";
import { Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import {
  Button,
  Card,
  DashboardHero,
  Header,
  MiniBarChart,
  ProgressLineCard,
  Screen,
  SectionTitle,
  StatusBadge,
  TextField,
} from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { usePayments } from "@/hooks/usePayments";
import { useAppTheme } from "@/theme";
import type { BillingCycle, TeacherPlanDefinition, TeacherPlanFeature } from "@/types";
import { formatDateBR } from "@/utils/dates";
import { formatCurrency, getPaymentStatusLabel, getPaymentStatusTone } from "@/utils/payments";

interface TeacherPlanFormValues {
  name: string;
  monthlyAmount: string;
  description: string;
}

function getBillingCycleLabel(cycle: BillingCycle) {
  if (cycle === "monthly") {
    return "Mensal";
  }

  if (cycle === "quarterly") {
    return "Trimestral";
  }

  return "Anual";
}

function getFeatureLabel(feature: TeacherPlanFeature) {
  if (feature === "diet") {
    return "Dieta";
  }

  if (feature === "training") {
    return "Treino";
  }

  return "Avaliacao";
}

function formatIncludedFeatures(plan: TeacherPlanDefinition) {
  return plan.includedFeatures.map(getFeatureLabel).join(", ");
}

export function PaymentsScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const {
    addTeacherPlan,
    getOpenRecordsByUser,
    getPaymentStatusByStudent,
    getTeacherPlansByTeacher,
    getTeacherExpectedRevenue,
    payRecord,
    paymentRecords,
    subscriptions,
    teacherPlans,
  } = usePayments();

  const currentUser = session.currentUser;
  const isTeacher = session.accessLevel === "teacher";
  const [planFormVisible, setPlanFormVisible] = useState(false);
  const [selectedBillingCycle, setSelectedBillingCycle] =
    useState<BillingCycle>("monthly");
  const [selectedFeatures, setSelectedFeatures] = useState<TeacherPlanFeature[]>([
    "diet",
    "training",
  ]);
  const planForm = useForm<TeacherPlanFormValues>({
    defaultValues: {
      name: "",
      monthlyAmount: "",
      description: "",
    },
  });

  if (!currentUser) {
    return null;
  }

  const openRecords = getOpenRecordsByUser(currentUser.id);

  if (isTeacher) {
    const expectedRevenue = getTeacherExpectedRevenue(currentUser.id);
    const teacherOwnedPlans = getTeacherPlansByTeacher(currentUser.id);
    const teacherRecords = paymentRecords.filter(
      (record) => record.teacherId === currentUser.id && record.kind === "studentPlan"
    );
    const paidStudents = teacherRecords.filter((record) => record.status === "paid").length;
    const lateStudents = subscriptions.filter((subscription) => subscription.status === "gracePeriod")
      .length;

    return (
      <Screen>
        <Header
          title="Pagamentos"
          subtitle="Acompanhe previsao de recebimento, alunos pagantes e os planos cadastrados pelo coach."
        />

        <DashboardHero
          accentLabel="Financeiro do coach"
          eyebrow="Pagamentos"
          stats={[
            { label: "Previsto", value: formatCurrency(expectedRevenue) },
            { label: "Pagos", value: String(paidStudents) },
            { label: "Planos", value: String(teacherOwnedPlans.length) },
          ]}
          subtitle="Financeiro mais limpo para entender previsao, alunos adimplentes e os planos comerciais ativos."
          title="Controle financeiro mais claro"
        />

        <ProgressLineCard
          currentLabel={`${paidStudents}/${teacherRecords.length || 0}`}
          helper="Relacao entre pagamentos confirmados e cobrancas do plano do coach."
          progress={teacherRecords.length > 0 ? paidStudents / teacherRecords.length : 0}
          targetLabel="parcelas liquidadas"
          title="Saude do recebimento"
        />

        <MiniBarChart
          description="Mini grafico para leitura imediata das frentes mais relevantes do financeiro."
          items={[
            { label: "Planos", value: teacherOwnedPlans.length, hint: "ativos" },
            { label: "Pagos", value: paidStudents, hint: "ok" },
            { label: "Atraso", value: lateStudents, hint: "alerta" },
          ]}
          title="Panorama financeiro"
        />

        <SectionTitle
          title="Cadastro de planos"
          description="Defina os planos que voce oferece e o que o aluno recebe em cada um."
        />
        <View style={{ gap: theme.spacing.md }}>
          <View style={{ alignSelf: "flex-start" }}>
            <Button
              fullWidth={false}
              label={planFormVisible ? "Fechar cadastro de plano" : "Cadastrar novo plano"}
              onPress={() => setPlanFormVisible((current) => !current)}
              size="sm"
            />
          </View>
          {planFormVisible ? (
            <Card>
              <View style={{ gap: theme.spacing.md }}>
                <Controller
                  control={planForm.control}
                  name="name"
                  rules={{ required: true }}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <TextField
                      label="Nome do plano"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="Ex.: Plano premium"
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={planForm.control}
                  name="monthlyAmount"
                  rules={{ required: true }}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <TextField
                      keyboardType="decimal-pad"
                      label="Valor mensal"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="199.90"
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={planForm.control}
                  name="description"
                  render={({ field: { onBlur, onChange, value } }) => (
                    <TextField
                      label="Descricao"
                      multiline
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="Explique a proposta comercial deste plano."
                      value={value}
                    />
                  )}
                />

                <View style={{ gap: theme.spacing.sm }}>
                  <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                    Ciclo de cobranca
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>
                    <Button
                      fullWidth={false}
                      label="Mensal"
                      onPress={() => setSelectedBillingCycle("monthly")}
                      size="sm"
                      variant={selectedBillingCycle === "monthly" ? "primary" : "soft"}
                    />
                    <Button
                      fullWidth={false}
                      label="Trimestral"
                      onPress={() => setSelectedBillingCycle("quarterly")}
                      size="sm"
                      variant={selectedBillingCycle === "quarterly" ? "primary" : "soft"}
                    />
                    <Button
                      fullWidth={false}
                      label="Anual"
                      onPress={() => setSelectedBillingCycle("yearly")}
                      size="sm"
                      variant={selectedBillingCycle === "yearly" ? "primary" : "soft"}
                    />
                  </View>
                </View>

                <View style={{ gap: theme.spacing.sm }}>
                  <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                    O aluno recebe neste plano
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>
                    {(["diet", "training", "assessment"] as TeacherPlanFeature[]).map(
                      (feature) => {
                        const active = selectedFeatures.includes(feature);

                        return (
                          <Button
                            fullWidth={false}
                            key={feature}
                            label={getFeatureLabel(feature)}
                            onPress={() =>
                              setSelectedFeatures((current) =>
                                active
                                  ? current.filter((item) => item !== feature)
                                  : [...current, feature]
                              )
                            }
                            size="sm"
                            variant={active ? "primary" : "soft"}
                          />
                        );
                      }
                    )}
                  </View>
                </View>

                <Button
                  label="Salvar plano comercial"
                  onPress={planForm.handleSubmit((values) => {
                    const parsedAmount = Number(values.monthlyAmount.replace(",", "."));

                    if (!parsedAmount || selectedFeatures.length === 0) {
                      return;
                    }

                    addTeacherPlan({
                      teacherId: currentUser.id,
                      name: values.name,
                      billingCycle: selectedBillingCycle,
                      monthlyAmount: parsedAmount,
                      description: values.description,
                      includedFeatures: selectedFeatures,
                    });
                    planForm.reset();
                    setSelectedBillingCycle("monthly");
                    setSelectedFeatures(["diet", "training"]);
                    setPlanFormVisible(false);
                  })}
                />
              </View>
            </Card>
          ) : null}
        </View>

        <SectionTitle
          title="Planos do coach"
          description="Mensal, trimestral e anual sempre cobrados mes a mes, com entregas definidas por plano."
        />
        <View style={{ gap: theme.spacing.md }}>
          {teacherOwnedPlans.map((plan) => (
            <Card key={plan.id}>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{plan.name}</Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  Ciclo: {getBillingCycleLabel(plan.billingCycle)}
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>{plan.description}</Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  Entregas: {formatIncludedFeatures(plan)}
                </Text>
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
        <Card>
          <View style={{ gap: theme.spacing.md }}>
            {subscriptions.map((subscription, index) => {
              const relatedPlan = teacherOwnedPlans.find(
                (plan) => plan.id === subscription.teacherPlanId
              );

              return (
                <View
                  key={subscription.id}
                  style={{
                    borderBottomColor: index === subscriptions.length - 1 ? "transparent" : theme.colors.border,
                    borderBottomWidth: index === subscriptions.length - 1 ? 0 : 1,
                    gap: theme.spacing.sm,
                    paddingBottom: index === subscriptions.length - 1 ? 0 : theme.spacing.md,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: theme.spacing.md,
                    }}
                  >
                    <Text style={{ color: theme.colors.text, flex: 1, fontWeight: "700" }}>
                      Aluna em foco do mock
                    </Text>
                    <StatusBadge
                      label={getPaymentStatusLabel(subscription.status)}
                      tone={getPaymentStatusTone(subscription.status)}
                    />
                  </View>
                  <Text style={{ color: theme.colors.textMuted }}>
                    Plano contratado: {relatedPlan?.name ?? "Plano nao encontrado"}
                  </Text>
                  <Text style={{ color: theme.colors.textMuted }}>
                    Entregas: {relatedPlan ? formatIncludedFeatures(relatedPlan) : "--"}
                  </Text>
                  <Text style={{ color: theme.colors.textMuted }}>
                    Proximo vencimento: {formatDateBR(subscription.nextDueDate)}
                  </Text>
                  <Text style={{ color: theme.colors.textMuted }}>
                    Tolerancia ate: {formatDateBR(subscription.graceUntilDate)}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>
      </Screen>
    );
  }

  const currentStatus = getPaymentStatusByStudent(currentUser.id);
  const currentSubscription = subscriptions.find(
    (subscription) => subscription.studentId === currentUser.id
  );
  const currentTeacherPlan = teacherPlans.find(
    (plan) => plan.id === currentSubscription?.teacherPlanId
  );

  return (
    <Screen>
      <Header
        title="Seus pagamentos"
        subtitle="Acompanhe a mensalidade da plataforma e a cobranca do seu plano com o coach."
      />

      <DashboardHero
        accentLabel="Financeiro do aluno"
        eyebrow="Conta"
        stats={[
          { label: "Pendencias", value: String(openRecords.length) },
          { label: "Plano", value: currentTeacherPlan ? formatCurrency(currentTeacherPlan.monthlyAmount) : "--" },
          { label: "Plataforma", value: "R$ 10,00" },
        ]}
        subtitle="Visao simples para entender sua situacao atual, o plano contratado e o que ainda precisa ser pago."
        title="Seus pagamentos em leitura rapida"
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

      <ProgressLineCard
        currentLabel={`${openRecords.length}`}
        helper="Quantidade de cobrancas abertas no momento para regularizar sua conta."
        progress={Math.max(0, 1 - openRecords.length / 3)}
        targetLabel="nivel de regularizacao"
        title="Situacao da conta"
        tone={openRecords.length > 0 ? "warning" : "success"}
      />

      {currentTeacherPlan ? (
        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
              Seu plano com o coach
            </Text>
            <Text style={{ color: theme.colors.textMuted }}>{currentTeacherPlan.name}</Text>
            <Text style={{ color: theme.colors.textMuted }}>
              Entregas inclusas: {formatIncludedFeatures(currentTeacherPlan)}
            </Text>
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
              {formatCurrency(currentTeacherPlan.monthlyAmount)}/mes
            </Text>
          </View>
        </Card>
      ) : null}

      <MiniBarChart
        description="Leitura compacta dos registros pagos e do que ainda esta aberto."
        items={[
          {
            label: "Abertos",
            value: openRecords.length,
            hint: "agora",
          },
          {
            label: "Pagos",
            value: paymentRecords.filter(
              (record) => record.userId === currentUser.id && record.status === "paid"
            ).length,
            hint: "hist.",
          },
          {
            label: "Plano",
            value: currentTeacherPlan ? Math.round(currentTeacherPlan.monthlyAmount) : 0,
            hint: "R$",
          },
        ]}
        title="Panorama da conta"
      />

      <SectionTitle
        title="Pendencias abertas"
        description="Escolha Pix ou cartao para regularizar seus pagamentos."
      />
      <Card>
        <View style={{ gap: theme.spacing.md }}>
          {openRecords.map((record, index) => (
            <View
              key={record.id}
              style={{
                borderBottomColor: index === openRecords.length - 1 ? "transparent" : theme.colors.border,
                borderBottomWidth: index === openRecords.length - 1 ? 0 : 1,
                gap: theme.spacing.sm,
                paddingBottom: index === openRecords.length - 1 ? 0 : theme.spacing.md,
              }}
            >
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
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>
                <Button
                  fullWidth={false}
                  label="Pagar com Pix"
                  onPress={() => payRecord(record.id, "pix")}
                  size="sm"
                />
                <Button
                  fullWidth={false}
                  label="Pagar com cartao"
                  onPress={() => payRecord(record.id, "card")}
                  size="sm"
                  variant="soft"
                />
              </View>
            </View>
          ))}
        </View>
      </Card>

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
