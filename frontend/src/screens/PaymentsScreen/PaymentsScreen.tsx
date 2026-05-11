import { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  Apple,
  CreditCard,
  DollarSign,
  House,
  Menu,
  MessageSquare,
  Wallet,
  Users,
  ClipboardList,
} from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  Button,
  PaymentSummaryCard,
  TextField,
} from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { usePayments } from "@/hooks/usePayments";
import { useAppTheme } from "@/theme";
import type { BillingCycle, TeacherPlanFeature } from "@/types";
import { formatDateBR } from "@/utils/dates";
import { formatCurrency } from "@/utils/payments";

interface TeacherPlanFormValues {
  name: string;
  monthlyAmount: string;
  description: string;
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

function getCycleLabel(cycle: BillingCycle) {
  if (cycle === "monthly") {
    return "Mensal";
  }

  if (cycle === "quarterly") {
    return "Trimestral";
  }

  return "Anual";
}

export function PaymentsScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const { session } = useMockAuth();
  const {
    addTeacherPlan,
    getOpenRecordsByUser,
    getTeacherExpectedRevenue,
    getTeacherPlansByTeacher,
    payRecord,
    paymentRecords,
    subscriptions,
  } = usePayments();
  const isTeacher = session.accessLevel === "teacher";
  const currentUser = session.currentUser;
  const [planFormVisible, setPlanFormVisible] = useState(false);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedFeatures, setSelectedFeatures] = useState<TeacherPlanFeature[]>([
    "diet",
    "training",
    "assessment",
  ]);
  const form = useForm<TeacherPlanFormValues>({
    defaultValues: {
      name: "",
      monthlyAmount: "",
      description: "",
    },
  });

  if (!currentUser) {
    return null;
  }

  if (isTeacher) {
    const expectedRevenue = getTeacherExpectedRevenue(currentUser.id);
    const teacherPlans = getTeacherPlansByTeacher(currentUser.id);
    const openCharges = paymentRecords.filter(
      (record) => record.teacherId === currentUser.id && record.status !== "paid"
    );

    return (
      <AppChrome
        footer={
          <AppBottomNav
            items={[
              {
                key: "dashboard",
                label: "Dashboard",
                icon: <House color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
                onPress: () => navigation.navigate("TeacherHome" as never),
              },
              {
                key: "students",
                label: "Alunos",
                icon: <Users color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
                onPress: () => navigation.navigate("TeacherStudent" as never),
              },
              {
                key: "plans",
                label: "Planos",
                icon: <ClipboardList color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
                onPress: () => navigation.navigate("CoachStudentPlans" as never),
              },
              {
                key: "payments",
                label: "Pagamentos",
                active: true,
                icon: <CreditCard color={theme.colors.primary} size={21} strokeWidth={2.1} />,
              },
              {
                key: "more",
                label: "Mais",
                icon: <Menu color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
                onPress: () => navigation.navigate("TeacherProfile" as never),
              },
            ]}
          />
        }
      >
        <AppTopBar
          onBackPress={() => navigation.goBack()}
          showAvatar={false}
          showBack
          showBell={false}
          title="Pagamentos"
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <PaymentSummaryCard
            icon={<Wallet color="#69C15D" size={17} strokeWidth={2.2} />}
            label="Receita no mês"
            value={formatCurrency(expectedRevenue)}
          />
          <PaymentSummaryCard
            icon={<DollarSign color={theme.colors.primary} size={17} strokeWidth={2.2} />}
            label="Pendentes"
            value={formatCurrency(1240)}
          />
          <PaymentSummaryCard
            icon={<CreditCard color="#4A91F3" size={17} strokeWidth={2.2} />}
            label="Pagos este mês"
            value="26"
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
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "600" }}>
              Cobranças em aberto
            </Text>
            <Text style={{ color: theme.colors.primary, fontSize: 12.5, fontWeight: "600" }}>
              Ver todos
            </Text>
          </View>
          <View style={{ gap: 12 }}>
            {openCharges.slice(0, 2).map((record) => (
              <View
                key={record.id}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: theme.radius.pill,
                    height: 38,
                    justifyContent: "center",
                    width: 38,
                  }}
                >
                  <CreditCard color={theme.colors.primary} size={16} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.text, fontSize: 13.5, fontWeight: "600" }}>
                    {record.userId === "user-student-1" ? "Juliana Mendes" : "Rafael Souza"}
                  </Text>
                  <Text style={{ color: theme.colors.textMuted, fontSize: 11.5 }}>
                    Vencimento: {formatDateBR(record.dueDate)}
                  </Text>
                </View>
                <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "600" }}>
                  {formatCurrency(record.amount)}
                </Text>
                <Button
                  fullWidth={false}
                  label="Pagar"
                  onPress={() => payRecord(record.id, "pix")}
                  size="sm"
                />
              </View>
            ))}
          </View>
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
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "600" }}>
              Planos oferecidos
            </Text>
            <Text
              onPress={() => setPlanFormVisible((current) => !current)}
              style={{ color: theme.colors.primary, fontSize: 12.5, fontWeight: "600" }}
            >
              {planFormVisible ? "Fechar" : "Cadastrar novo plano"}
            </Text>
          </View>

          {teacherPlans.map((plan) => (
            <View
              key={plan.id}
              style={{
                borderBottomColor: "rgba(255,255,255,0.06)",
                borderBottomWidth: 1,
                gap: 3,
                paddingBottom: 12,
              }}
            >
              <Text style={{ color: theme.colors.text, fontSize: 14, fontWeight: "600" }}>
                {plan.name}
              </Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                {getCycleLabel(plan.billingCycle)} • {plan.includedFeatures.map(getFeatureLabel).join(" • ")}
              </Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{plan.description}</Text>
              <Text style={{ color: theme.colors.success, fontSize: 13, fontWeight: "700" }}>
                {formatCurrency(plan.monthlyAmount)} / mês
              </Text>
            </View>
          ))}

          {planFormVisible ? (
            <View style={{ gap: 12, paddingTop: 6 }}>
              <Controller
                control={form.control}
                name="name"
                rules={{ required: true }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextField
                    label="Nome do plano"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Plano mensal"
                    value={value}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="monthlyAmount"
                rules={{ required: true }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextField
                    label="Valor mensal"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="120.00"
                    value={value}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="description"
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextField
                    label="Descricao"
                    multiline
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Explique a proposta comercial."
                    value={value}
                  />
                )}
              />
              <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "600" }}>
                O aluno recebe neste plano
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {(["diet", "training", "assessment"] as TeacherPlanFeature[]).map((feature) => {
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
                })}
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {(["monthly", "quarterly", "yearly"] as BillingCycle[]).map((cycle) => (
                  <Button
                    fullWidth={false}
                    key={cycle}
                    label={getCycleLabel(cycle)}
                    onPress={() => setSelectedBillingCycle(cycle)}
                    size="sm"
                    variant={selectedBillingCycle === cycle ? "primary" : "soft"}
                  />
                ))}
              </View>
              <Button
                label="Salvar plano comercial"
                onPress={form.handleSubmit((values) => {
                  const amount = Number(values.monthlyAmount.replace(",", "."));
                  if (!amount) {
                    return;
                  }

                  addTeacherPlan({
                    teacherId: currentUser.id,
                    name: values.name,
                    description: values.description,
                    billingCycle: selectedBillingCycle,
                    includedFeatures: selectedFeatures,
                    monthlyAmount: amount,
                  });
                  form.reset();
                  setPlanFormVisible(false);
                })}
              />
            </View>
          ) : null}
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button fullWidth={false} label="Pix" onPress={() => null} size="sm" variant="soft" />
          <Button fullWidth={false} label="Cartão" onPress={() => null} size="sm" variant="soft" />
        </View>
      </AppChrome>
    );
  }

  const subscription = subscriptions.find((item) => item.studentId === currentUser.id);
  const openRecords = getOpenRecordsByUser(currentUser.id);

  return (
    <AppChrome
      footer={
        <AppBottomNav
          items={[
            {
              key: "dashboard",
              label: "Dashboard",
              icon: <House color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentHome" as never),
            },
            {
              key: "workout",
              label: "Treino",
              icon: <Users color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentWorkout" as never),
            },
            {
              key: "plans",
              label: "Dieta",
              icon: <Apple color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentDiet" as never),
            },
            {
              key: "payments",
              label: "Pagamentos",
              active: true,
              icon: <CreditCard color={theme.colors.primary} size={21} strokeWidth={2.1} />,
            },
            {
              key: "more",
              label: "Mais",
              icon: <Menu color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentProfile" as never),
            },
          ]}
        />
      }
    >
      <AppTopBar
        onBackPress={() => navigation.goBack()}
        showAvatar={false}
        showBack
        showBell={false}
        title="Pagamentos"
      />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <PaymentSummaryCard
          icon={<Wallet color={theme.colors.primary} size={17} strokeWidth={2.2} />}
          label="Seu plano"
          value={subscription?.teacherPlanId ? "Ativo" : "Sem plano"}
        />
        <PaymentSummaryCard
          icon={<DollarSign color={theme.colors.success} size={17} strokeWidth={2.2} />}
          label="Em aberto"
          value={formatCurrency(openRecords[0]?.amount ?? 0)}
        />
      </View>

      {subscription ? (
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
            Seu plano com o coach
          </Text>
          <Text style={{ color: theme.colors.text, fontSize: 14.5, fontWeight: "600" }}>
            Coaching premium
          </Text>
          <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
            Entregas inclusas: Dieta, Treino, Avaliacao
          </Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              fullWidth={false}
              label="Pagar com Pix"
              onPress={() => openRecords[0] && payRecord(openRecords[0].id, "pix")}
              size="sm"
            />
            <Button
              fullWidth={false}
              label="Cartão"
              onPress={() => null}
              size="sm"
              variant="soft"
            />
          </View>
        </View>
      ) : null}
    </AppChrome>
  );
}
