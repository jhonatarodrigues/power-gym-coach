import { useState } from "react";
import { Text, View } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  ClipboardList,
  CreditCard,
  Dumbbell,
  FileText,
  House,
  Menu,
  MessageSquare,
  Stethoscope,
  TestTubeDiagonal,
  Users,
} from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  Button,
  PaymentSummaryCard,
  StatusBadge,
  TextField,
} from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { usePayments } from "@/hooks/usePayments";
import { useAppTheme } from "@/theme";
import type { BillingCycle, TeacherPlanFeature } from "@/types";
import { formatCurrency } from "@/utils/payments";

interface CommercialPlanFormValues {
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

  if (feature === "assessment") {
    return "Avaliação";
  }

  return "Exames";
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

function getPlanIcon(feature: TeacherPlanFeature, color: string) {
  if (feature === "diet") {
    return <FileText color={color} size={16} strokeWidth={2.1} />;
  }

  if (feature === "training") {
    return <Dumbbell color={color} size={16} strokeWidth={2.1} />;
  }

  if (feature === "assessment") {
    return <Stethoscope color={color} size={16} strokeWidth={2.1} />;
  }

  return <TestTubeDiagonal color={color} size={16} strokeWidth={2.1} />;
}

export function CoachCommercialPlansScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const drawerParent = navigation.getParent();
  const { session } = useMockAuth();
  const {
    addTeacherPlan,
    getTeacherExpectedRevenue,
    getTeacherPlansByTeacher,
    subscriptions,
  } = usePayments();
  const currentUser = session.currentUser;
  const [planFormVisible, setPlanFormVisible] = useState(false);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedFeatures, setSelectedFeatures] = useState<TeacherPlanFeature[]>([
    "diet",
    "training",
    "assessment",
    "exams",
  ]);
  const { control, handleSubmit, reset } = useForm<CommercialPlanFormValues>({
    defaultValues: {
      name: "",
      monthlyAmount: "",
      description: "",
    },
  });

  if (!currentUser) {
    return null;
  }

  const teacherPlans = getTeacherPlansByTeacher(currentUser.id);
  const coachSubscriptions = subscriptions.filter(
    (subscription) => subscription.teacherId === currentUser.id
  );
  const expectedRevenue = getTeacherExpectedRevenue(currentUser.id);

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
              key: "payments",
              label: "Pagamentos",
              active: true,
              icon: <CreditCard color={theme.colors.primary} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherPayments" as never),
            },
            {
              key: "messages",
              label: "Mensagens",
              icon: <MessageSquare color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("Messages" as never),
            },
            {
              key: "more",
              label: "Mais",
              icon: <Menu color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => drawerParent?.dispatch(DrawerActions.toggleDrawer()),
            },
          ]}
        />
      }
    >
      <AppTopBar
        avatarUrl={currentUser.avatarUrl}
        onAvatarPress={() => navigation.navigate("TeacherProfile" as never)}
        onMenuPress={() => drawerParent?.dispatch(DrawerActions.toggleDrawer())}
        showMenu
        subtitle="Catálogo comercial"
        title="Planos oferecidos"
      />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <PaymentSummaryCard
          icon={<ClipboardList color={theme.colors.primary} size={17} strokeWidth={2.2} />}
          label="Planos ativos"
          value={String(teacherPlans.length)}
        />
        <PaymentSummaryCard
          icon={<Users color="#69C15D" size={17} strokeWidth={2.2} />}
          label="Alunos assinando"
          value={String(coachSubscriptions.length)}
        />
        <PaymentSummaryCard
          icon={<CreditCard color="#4A91F3" size={17} strokeWidth={2.2} />}
          label="Valor mensal"
          value={formatCurrency(expectedRevenue)}
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
          <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>
            Catálogo do coach
          </Text>
          <Text
            onPress={() => setPlanFormVisible((current) => !current)}
            style={{ color: theme.colors.primary, fontSize: 12.5, fontWeight: "700" }}
          >
            {planFormVisible ? "Fechar cadastro" : "Cadastrar novo plano"}
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {teacherPlans.map((plan) => (
            <View
              key={plan.id}
              style={{
                backgroundColor: theme.colors.surfaceAlt,
                borderColor: "rgba(255,255,255,0.04)",
                borderRadius: 20,
                borderWidth: 1,
                gap: 12,
                padding: 14,
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "700" }}>
                    {plan.name}
                  </Text>
                  <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
                    {plan.description}
                  </Text>
                </View>
                <StatusBadge label={getCycleLabel(plan.billingCycle)} tone="warning" />
              </View>

              <Text style={{ color: theme.colors.primary, fontSize: 15, fontWeight: "700" }}>
                {formatCurrency(plan.monthlyAmount)} por{" "}
                {plan.billingCycle === "monthly"
                  ? "mês"
                  : plan.billingCycle === "quarterly"
                    ? "trimestre"
                    : "ano"}
              </Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {plan.includedFeatures.map((feature) => (
                  <View
                    key={`${plan.id}-${feature}`}
                    style={{
                      alignItems: "center",
                      backgroundColor: theme.colors.surface,
                      borderRadius: theme.radius.pill,
                      flexDirection: "row",
                      gap: 6,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                    }}
                  >
                    {getPlanIcon(feature, theme.colors.primary)}
                    <Text style={{ color: theme.colors.text, fontSize: 12.5, fontWeight: "600" }}>
                      {getFeatureLabel(feature)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {planFormVisible ? (
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
          <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>
            Cadastrar plano comercial
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                label="Nome do plano"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="monthlyAmount"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                keyboardType="numeric"
                label="Valor do plano"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                label="Descrição"
                multiline
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <View style={{ gap: 10 }}>
            <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "700" }}>
              Tempo do plano
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {(["monthly", "quarterly", "yearly"] as BillingCycle[]).map((cycle) => (
                <Button
                  fullWidth={false}
                  key={cycle}
                  label={getCycleLabel(cycle)}
                  onPress={() => setSelectedBillingCycle(cycle)}
                  size="sm"
                  variant={selectedBillingCycle === cycle ? "primary" : "ghost"}
                />
              ))}
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "700" }}>
              O aluno recebe neste plano
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {(["diet", "training", "assessment", "exams"] as TeacherPlanFeature[]).map(
                (feature) => {
                  const selected = selectedFeatures.includes(feature);

                  return (
                    <Button
                      fullWidth={false}
                      key={feature}
                      label={getFeatureLabel(feature)}
                      onPress={() =>
                        setSelectedFeatures((current) =>
                          current.includes(feature)
                            ? current.filter((item) => item !== feature)
                            : [...current, feature]
                        )
                      }
                      size="sm"
                      variant={selected ? "primary" : "ghost"}
                    />
                  );
                }
              )}
            </View>
          </View>

          <Button
            label="Salvar plano comercial"
            onPress={handleSubmit((values) => {
              addTeacherPlan({
                teacherId: currentUser.id,
                name: values.name.trim() || "Novo plano",
                billingCycle: selectedBillingCycle,
                monthlyAmount: Number(values.monthlyAmount) || 0,
                description: values.description.trim(),
                includedFeatures: selectedFeatures,
              });
              reset();
              setSelectedBillingCycle("monthly");
              setSelectedFeatures(["diet", "training", "assessment", "exams"]);
              setPlanFormVisible(false);
            })}
          />
        </View>
      ) : null}
    </AppChrome>
  );
}
