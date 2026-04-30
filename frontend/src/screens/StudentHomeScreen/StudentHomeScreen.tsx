import { Text, View } from "react-native";
import { CalendarDays, CirclePlay, Dumbbell } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  Button,
  Header,
  HistoryCard,
  MetricCard,
  Screen,
  SectionTitle,
  TrainingDayCard,
} from "@/components";
import {
  assessmentReviewsMock,
  examRequestsMock,
  historyRecordsMock,
  progressEntriesMock,
} from "@/repository/mock";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useMockAuth } from "@/hooks/useMockAuth";
import { usePayments } from "@/hooks/usePayments";
import { useStudentTodayWorkout } from "@/hooks/useStudentTodayWorkout";
import { useAppTheme } from "@/theme";
import type { RootStackParamList } from "@/navigation/types";
import { getWeekdayLabel } from "@/utils/weekdays";
import { getPaymentStatusLabel } from "@/utils/payments";

export function StudentHomeScreen() {
  const { theme } = useAppTheme();
  const { session, signInAs, signOut } = useMockAuth();
  const { currentPlan } = useCurrentPlan();
  const { getOpenRecordsByUser, getPaymentStatusByStudent } = usePayments();
  const { allDays, completedCount, todayLabel, todayTraining, totalExercises } =
    useStudentTodayWorkout();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const latestProgress = progressEntriesMock.at(-1);
  const latestAssessment = assessmentReviewsMock.at(-1);
  const pendingExams = examRequestsMock.filter(
    (request) => request.status === "pending"
  ).length;
  const currentUser = session.currentUser;
  const openPayments = currentUser ? getOpenRecordsByUser(currentUser.id) : [];
  const paymentStatus = currentUser
    ? getPaymentStatusByStudent(currentUser.id)
    : null;

  return (
    <Screen>
      <Header
        showBackButton={false}
        title="Dashboard do aluno"
        subtitle="Seu treino do dia, dieta, pagamentos e progresso em um unico lugar."
      />

      {paymentStatus && paymentStatus !== "paid" ? (
        <View
          style={{
            backgroundColor: theme.colors.primaryMuted,
            borderColor: theme.colors.primary,
            borderRadius: theme.radius.lg,
            borderWidth: 1,
            gap: theme.spacing.sm,
            padding: theme.spacing.lg,
          }}
        >
          <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
            Pagamento pendente
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Sua conta esta em status "{getPaymentStatusLabel(paymentStatus)}". Voce tem 3 dias
            para regularizar antes da inativacao.
          </Text>
          <Button label="Regularizar agora" onPress={() => navigation.navigate("Payments")} />
        </View>
      ) : null}

      <MetricCard
        label="calorias do plano"
        value={String(currentPlan.dietPlan.calories)}
        trend={`${currentPlan.dietPlan.carbs.toFixed(1)}g carb / ${currentPlan.dietPlan.protein.toFixed(1)}g prot`}
      />

      <SectionTitle
        title="Treino de hoje"
        description="Sempre priorizar o plano atual antes do historico."
      />
      {todayTraining ? (
        <>
          <View style={{ gap: theme.spacing.sm }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: theme.spacing.sm,
              }}
            >
              <CalendarDays color={theme.colors.primary} size={18} />
              <View style={{ gap: theme.spacing.xs }}>
                <MetricCard
                  label={todayLabel}
                  value={`${completedCount}/${totalExercises}`}
                  trend="exercicios marcados no dia"
                />
              </View>
            </View>
            <TrainingDayCard day={todayTraining} />
          </View>
          <Button
            label="Abrir treino do dia"
            onPress={() => navigation.navigate("StudentWorkout")}
          />
        </>
      ) : null}

      <SectionTitle
        title="Treinos da semana"
        description="Separado por dias da semana para facilitar a leitura do aluno."
      />
      <View style={{ gap: theme.spacing.md }}>
        {allDays.map((day) => (
          <View
            key={day.id}
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.md,
              borderWidth: 1,
              gap: theme.spacing.sm,
              padding: theme.spacing.lg,
            }}
          >
            <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
              <Dumbbell color={theme.colors.primary} size={18} />
              <View style={{ flex: 1, gap: theme.spacing.xs }}>
                <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
                  <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                    {getWeekdayLabel(day.weekday)}
                  </Text>
                  {day.id === todayTraining?.id ? (
                    <CirclePlay color={theme.colors.primary} size={16} />
                  ) : null}
                </View>
                <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                  {day.title}
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  {day.exercises.length} exercicios programados
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={{ gap: theme.spacing.md }}>
        <MetricCard
          label="avaliacao recente"
          value={latestAssessment ? "1" : "0"}
          trend="feedback do professor disponivel"
        />
        <MetricCard
          label="exames pendentes"
          value={String(pendingExams)}
          trend="envie quando tiver os resultados"
        />
        <MetricCard
          label="pagamentos em aberto"
          value={String(openPayments.length)}
          trend="plataforma e plano do professor"
        />
      </View>

      <SectionTitle
        title="Progresso"
        description="Ultima entrada registrada no mock."
      />
      <HistoryCard
        record={{
          id: latestProgress?.id ?? "progress-preview",
          studentId: "user-student-1",
          type: "progress",
          title: `${latestProgress?.weightKg} kg / ${latestProgress?.bodyFatPercentage}% BF`,
          description: latestProgress?.notes,
          date: latestProgress?.date ?? "",
        }}
      />

      <SectionTitle
        title="Historico recente"
        description="Somente registros passados devem aparecer aqui."
      />
      <View style={{ gap: theme.spacing.md }}>
        {historyRecordsMock.slice(0, 2).map((record) => (
          <HistoryCard key={record.id} record={record} />
        ))}
      </View>

      <View style={{ gap: theme.spacing.md }}>
        <Button
          label="Abrir avaliacao"
          onPress={() =>
            navigation.navigate("Assessment")
          }
        />
        <Button
          label="Abrir exames"
          onPress={() => navigation.navigate("Exams")}
          variant="ghost"
        />
        <Button
          label="Abrir dieta do dia"
          onPress={() => navigation.navigate("StudentDiet")}
          variant="ghost"
        />
        <Button
          label="Abrir pagamentos"
          onPress={() => navigation.navigate("Payments")}
          variant="ghost"
        />
        <Button
          label="Abrir perfil"
          onPress={() => navigation.navigate("Profile")}
          variant="ghost"
        />
        <Button
          label="Ir para treino do dia"
          onPress={() => navigation.navigate("StudentWorkout")}
          variant="ghost"
        />
        <Button label="Trocar para visao do professor" onPress={() => signInAs("teacher")} />
        <Button label="Selecionar perfil" onPress={signOut} variant="ghost" />
      </View>
    </Screen>
  );
}
