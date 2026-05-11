import { Text, View } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  Apple,
  CreditCard,
  DollarSign,
  House,
  Menu,
  MessageSquare,
  Wallet,
  Users,
} from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  Button,
  PaymentSummaryCard,
  StatusBadge,
} from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { usePayments } from "@/hooks/usePayments";
import { usersMock } from "@/repository/mock";
import { useAppTheme } from "@/theme";
import type { BillingCycle, PaymentStatus, TeacherPlanFeature } from "@/types";
import { formatDateBR } from "@/utils/dates";
import { formatCurrency } from "@/utils/payments";

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

function getStatusLabel(status: PaymentStatus) {
  if (status === "paid") {
    return "Pago";
  }

  if (status === "gracePeriod") {
    return "Carência";
  }

  if (status === "overdue") {
    return "Atrasado";
  }

  if (status === "inactive") {
    return "Inativo";
  }

  return "Pendente";
}

function getStatusTone(status: PaymentStatus) {
  if (status === "paid") {
    return "success" as const;
  }

  if (status === "gracePeriod" || status === "overdue") {
    return "warning" as const;
  }

  return "default" as const;
}

export function PaymentsScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const drawerParent = navigation.getParent();
  const { session } = useMockAuth();
  const {
    getOpenRecordsByUser,
    getTeacherCollectedRevenue,
    getTeacherExpectedRevenue,
    getTeacherPlansByTeacher,
    getTeacherStudentPlanRecords,
    payRecord,
    subscriptions,
  } = usePayments();
  const currentUser = session.currentUser;
  const isTeacher = session.accessLevel === "teacher";

  if (!currentUser) {
    return null;
  }

  if (isTeacher) {
    const teacherPlans = getTeacherPlansByTeacher(currentUser.id);
    const coachSubscriptions = subscriptions.filter(
      (subscription) => subscription.teacherId === currentUser.id
    );
    const expectedRevenue = getTeacherExpectedRevenue(currentUser.id);
    const collectedRevenue = getTeacherCollectedRevenue(currentUser.id);
    const completionRatio =
      expectedRevenue > 0 ? Math.min(100, Math.round((collectedRevenue / expectedRevenue) * 100)) : 0;
    const teacherRecords = getTeacherStudentPlanRecords(currentUser.id);
    const roster = coachSubscriptions.map((subscription) => {
      const student = usersMock.find((user) => user.id === subscription.studentId);
      const plan = teacherPlans.find((item) => item.id === subscription.teacherPlanId);
      const latestPlanRecord = [...teacherRecords]
        .filter((record) => record.subscriptionId === subscription.id)
        .sort((left, right) => right.dueDate.localeCompare(left.dueDate))[0];

      return {
        id: subscription.id,
        studentName: student?.name ?? "Aluno",
        planName: plan?.name ?? "Plano não encontrado",
        planAmount: plan?.monthlyAmount ?? latestPlanRecord?.amount ?? 0,
        billingCycle: plan?.billingCycle ?? "monthly",
        nextDueDate: subscription.nextDueDate,
        status: subscription.status,
      };
    });

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
          subtitle="Financeiro do coach"
          title="Pagamentos"
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <PaymentSummaryCard
            icon={<Users color={theme.colors.primary} size={17} strokeWidth={2.2} />}
            label="Alunos no financeiro"
            value={String(coachSubscriptions.length)}
          />
          <PaymentSummaryCard
            icon={<Wallet color="#69C15D" size={17} strokeWidth={2.2} />}
            label="Receita prevista"
            value={formatCurrency(expectedRevenue)}
          />
          <PaymentSummaryCard
            icon={<DollarSign color="#4A91F3" size={17} strokeWidth={2.2} />}
            label="Recebido"
            value={formatCurrency(collectedRevenue)}
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
              Receita do ciclo
            </Text>
            <Text style={{ color: theme.colors.primary, fontSize: 14, fontWeight: "700" }}>
              {completionRatio}%
            </Text>
          </View>
          <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
            Você tem {coachSubscriptions.length} alunos assinando. O total previsto é{" "}
            {formatCurrency(expectedRevenue)} e já foram pagos {formatCurrency(collectedRevenue)}.
          </Text>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: theme.radius.pill,
              height: 10,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.pill,
                height: "100%",
                width: `${completionRatio}%`,
              }}
            />
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
          <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>
            Status por aluno
          </Text>
          <View style={{ gap: 12 }}>
            {roster.map((item) => (
              <View
                key={item.id}
                style={{
                  borderBottomColor: "rgba(255,255,255,0.06)",
                  borderBottomWidth: 1,
                  gap: 8,
                  paddingBottom: 12,
                }}
              >
                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flex: 1, gap: 3 }}>
                    <Text style={{ color: theme.colors.text, fontSize: 14.5, fontWeight: "700" }}>
                      {item.studentName}
                    </Text>
                    <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
                      {item.planName} • {formatCurrency(item.planAmount)} •{" "}
                      {getCycleLabel(item.billingCycle)}
                    </Text>
                  </View>
                  <StatusBadge label={getStatusLabel(item.status)} tone={getStatusTone(item.status)} />
                </View>
                <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                  Próximo vencimento: {formatDateBR(item.nextDueDate)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </AppChrome>
    );
  }

  const subscription = subscriptions.find((item) => item.studentId === currentUser.id);
  const openRecords = getOpenRecordsByUser(currentUser.id);
  const teacherPlans = currentUser ? getTeacherPlansByTeacher("user-teacher-1") : [];
  const currentPlan = teacherPlans.find((plan) => plan.id === subscription?.teacherPlanId);

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
              key: "diet",
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
          value={currentPlan?.name ?? "Sem plano"}
        />
        <PaymentSummaryCard
          icon={<DollarSign color={theme.colors.success} size={17} strokeWidth={2.2} />}
          label="Em aberto"
          value={formatCurrency(openRecords[0]?.amount ?? 0)}
        />
      </View>

      {subscription && currentPlan ? (
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
            {currentPlan.name}
          </Text>
          <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
            {getCycleLabel(currentPlan.billingCycle)} • {formatCurrency(currentPlan.monthlyAmount)}
          </Text>
          <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
            Entregas inclusas: {currentPlan.includedFeatures.map(getFeatureLabel).join(", ")}
          </Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              fullWidth={false}
              label="Pagar com Pix"
              onPress={() => openRecords[0] && payRecord(openRecords[0].id, "pix")}
              size="sm"
            />
            <Button fullWidth={false} label="Cartão" onPress={() => null} size="sm" variant="soft" />
          </View>
        </View>
      ) : null}
    </AppChrome>
  );
}
