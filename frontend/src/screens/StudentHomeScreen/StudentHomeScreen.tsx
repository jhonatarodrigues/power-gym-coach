import { Text, View } from "react-native";
import { CalendarDays, CirclePlay, Dumbbell } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  Button,
  Card,
  DashboardHero,
  Header,
  HistoryCard,
  MiniBarChart,
  ProgressLineCard,
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
import { useStudentDailyDiet } from "@/hooks/useStudentDailyDiet";
import { useStudentTodayWorkout } from "@/hooks/useStudentTodayWorkout";
import { useAppTheme } from "@/theme";
import type { RootStackParamList } from "@/navigation/types";
import { getWeekdayLabel } from "@/utils/weekdays";
import { getPaymentStatusLabel } from "@/utils/payments";

export function StudentHomeScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const { currentPlan } = useCurrentPlan();
  const { getOpenRecordsByUser, getPaymentStatusByStudent } = usePayments();
  const {
    consumedCalories,
    consumedMealItems,
    meals,
    remainingCalories,
    waterIntake,
    waterTarget,
  } = useStudentDailyDiet();
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
  const calorieProgress =
    currentPlan.dietPlan.calories > 0
      ? consumedCalories / currentPlan.dietPlan.calories
      : 0;
  const waterProgress = waterTarget > 0 ? waterIntake / waterTarget : 0;
  const mealChartItems = meals.map((meal) => ({
    hint: `${meal.items.length} itens`,
    label: meal.sequenceLabel ?? meal.title,
    value: consumedMealItems[meal.id]?.length ?? 0,
  }));
  const weekProgress = totalExercises > 0 ? completedCount / totalExercises : 0;

  return (
    <Screen>
      <Header
        showBackButton={false}
        showBrand
        title="Home do aluno"
        subtitle="Resumo do dia com treino, dieta, progresso e pagamentos sem poluicao visual."
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
          <View style={{ alignSelf: "flex-start" }}>
            <Button
              fullWidth={false}
              label="Regularizar agora"
              onPress={() => navigation.navigate("Payments")}
              size="sm"
            />
          </View>
        </View>
      ) : null}

      <DashboardHero
        accentLabel={todayTraining ? `${todayLabel} ativo` : "Sem treino hoje"}
        eyebrow="Seu dia"
        stats={[
          { label: "Plano", value: `${currentPlan.dietPlan.calories} kcal` },
          { label: "Consumido", value: `${consumedCalories} kcal` },
          { label: "Restante", value: `${remainingCalories} kcal` },
        ]}
        subtitle="Um painel mais direto para enxergar energia, treino e progresso sem precisar abrir varias telas."
        title={`Hoje o foco e manter constancia${currentUser ? `, ${currentUser.name.split(" ")[0]}` : ""}`}
      />

      <ProgressLineCard
        currentLabel={`${consumedCalories} kcal`}
        helper={`Meta diaria de ${currentPlan.dietPlan.calories} kcal com ${Math.round(calorieProgress * 100)}% do plano consumido.`}
        progress={calorieProgress}
        targetLabel={`${remainingCalories} kcal restantes`}
        title="Calorias do dia"
      />

      <ProgressLineCard
        currentLabel={`${waterIntake.toFixed(1)} L`}
        helper={`Meta diaria de hidratacao: ${waterTarget.toFixed(1)} litros.`}
        progress={waterProgress}
        targetLabel={`${Math.max(0, waterTarget - waterIntake).toFixed(1)} L restantes`}
        title="Agua do dia"
        tone="success"
      />

      <MiniBarChart
        description="Mini grafico de marcacao das refeicoes do dia, por refeicao."
        items={mealChartItems}
        title="Consumo por refeicao"
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
              <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                {todayLabel}: {completedCount}/{totalExercises} exercicios concluidos
              </Text>
            </View>
            <TrainingDayCard day={todayTraining} />
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <Button
              fullWidth={false}
              label="Abrir treino do dia"
              onPress={() => navigation.navigate("StudentWorkout")}
              size="sm"
            />
          </View>
        </>
      ) : null}

      <ProgressLineCard
        currentLabel={`${completedCount}/${totalExercises}`}
        helper="Leitura rapida dos exercicios marcados dentro do treino programado para hoje."
        progress={weekProgress}
        targetLabel="progresso do treino do dia"
        title="Execucao do treino"
        tone="warning"
      />

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

      <MiniBarChart
        description="Leitura compacta das pendencias e retornos mais importantes do momento."
        items={[
          {
            label: "Feedback",
            value: latestAssessment ? 1 : 0,
            hint: latestAssessment ? "ok" : "sem",
          },
          { label: "Exames", value: pendingExams, hint: "pend." },
          { label: "Pagtos", value: openPayments.length, hint: "aberto" },
        ]}
        title="Pendencias do momento"
      />

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

      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
            Atalhos do dia
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Abra as areas mais usadas sem perder a leitura da home.
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>
            <Button
              fullWidth={false}
              label="Abrir dieta de hoje"
              onPress={() => navigation.navigate("StudentDiet")}
              size="sm"
            />
            <Button
              fullWidth={false}
              label="Ver pagamentos"
              onPress={() => navigation.navigate("Payments")}
              size="sm"
              variant="soft"
            />
          </View>
        </View>
      </Card>
    </Screen>
  );
}
