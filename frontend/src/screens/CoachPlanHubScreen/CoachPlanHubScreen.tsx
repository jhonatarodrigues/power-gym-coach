import { Text, View } from "react-native";
import {
  CreditCard,
  FileText,
  House,
  Menu,
  MessageSquare,
  Sparkles,
  Stethoscope,
  TestTubeDiagonal,
  Users,
  Dumbbell,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  Button,
  MealPlanSection,
  PlanModuleCard,
  PlanNotesCard,
  PlanSummaryCard,
  SupplementPlanCard,
  TrainingDaySection,
} from "@/components";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useAppTheme } from "@/theme";
import { formatDateBR } from "@/utils/dates";

const weekdayOrder = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

function getRemainingDays(endDate?: string) {
  if (!endDate) {
    return 0;
  }

  const current = new Date("2026-05-11T00:00:00.000Z");
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const diff = end.getTime() - current.getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function CoachPlanHubScreen() {
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const selectedStudent = useCoachContextStore((state) => state.getSelectedStudent());
  const selectedPlan = useCoachContextStore((state) => state.getSelectedPlan());

  if (!selectedStudent || !selectedPlan) {
    return null;
  }

  const isEditable = selectedPlan.status !== "archived";

  const orderedDays = [...selectedPlan.trainingPlan.days].sort(
    (left, right) =>
      weekdayOrder.indexOf(left.weekday) - weekdayOrder.indexOf(right.weekday)
  );

  const noteItems = [
    selectedPlan.trainingPlan.notes,
    selectedPlan.dietPlan.notes,
    selectedStudent.profile.restrictions
      ? `Atenção clínica: ${selectedStudent.profile.restrictions}`
      : undefined,
  ].filter(Boolean) as string[];

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
              icon: <CreditCard color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
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
              onPress: () => navigation.goBack(),
            },
          ]}
        />
      }
    >
      <AppTopBar
        avatarUrl={selectedStudent.user.avatarUrl}
        onAvatarPress={() => navigation.navigate("TeacherProfile" as never)}
        onBackPress={() => navigation.goBack()}
        showBack
        showBell={false}
        subtitle={`Objetivo: ${selectedStudent.profile.goal}`}
        title="Detalhe do plano"
      />

      <View style={{ gap: 4 }}>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: "800" }}>
          {selectedStudent.user.name}
        </Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
          {isEditable
            ? "Plano atual com treino, dieta, observações, suplementação, avaliação e exames."
            : "Plano histórico em modo leitura, sem edição de treino ou dieta."}
        </Text>
      </View>

      <PlanSummaryCard
        endDate={formatDateBR(selectedPlan.endDate ?? selectedPlan.startDate)}
        progress={selectedPlan.status === "archived" ? 100 : 64}
        remainingDays={getRemainingDays(selectedPlan.endDate)}
        startDate={formatDateBR(selectedPlan.startDate)}
        statusLabel={selectedPlan.status === "archived" ? "Concluído" : "Ativo"}
        title={selectedPlan.status === "archived" ? "Plano histórico" : "Plano atual"}
      />

      <View style={{ gap: 12 }}>
        <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>
          Módulos do plano
        </Text>
        <View style={{ gap: 10 }}>
          <View style={{ opacity: isEditable ? 1 : 0.8 }}>
            <PlanModuleCard
              icon={<Stethoscope color={theme.colors.primary} size={18} strokeWidth={2.1} />}
              subtitle={
                isEditable
                  ? "Acompanhe feedbacks e revise a leitura corporal do ciclo."
                  : "Histórico da avaliação do ciclo concluído."
              }
              title="Avaliação"
            />
          </View>
          <View style={{ opacity: isEditable ? 1 : 0.8 }}>
            <PlanModuleCard
              icon={<TestTubeDiagonal color={theme.colors.primary} size={18} strokeWidth={2.1} />}
              subtitle={
                isEditable
                  ? "Solicitações e anexos de exames ligados a este aluno."
                  : "Linha de exames já encerrada para consulta."
              }
              title="Exames"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          <Button
            fullWidth={false}
            label="Abrir avaliação"
            onPress={isEditable ? () => navigation.navigate("Assessment" as never) : undefined}
            size="sm"
            variant={isEditable ? "primary" : "ghost"}
          />
          <Button
            fullWidth={false}
            label="Abrir exames"
            onPress={isEditable ? () => navigation.navigate("Exams" as never) : undefined}
            size="sm"
            variant={isEditable ? "primary" : "ghost"}
          />
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>
            Treino do plano
          </Text>
          {isEditable ? (
            <Button
              fullWidth={false}
              label="Editar treino"
              onPress={() => navigation.navigate("TrainingEditor" as never)}
              rightIcon={<Dumbbell color="#0B0B0B" size={14} strokeWidth={2.1} />}
              size="sm"
            />
          ) : null}
        </View>
        {orderedDays.map((day) => (
          <TrainingDaySection day={day} key={day.id} />
        ))}
      </View>

      <View style={{ gap: 12 }}>
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>
            Dieta do plano
          </Text>
          {isEditable ? (
            <Button
              fullWidth={false}
              label="Editar dieta"
              onPress={() => navigation.navigate("DietEditor" as never)}
              rightIcon={<FileText color="#0B0B0B" size={14} strokeWidth={2.1} />}
              size="sm"
            />
          ) : null}
        </View>
        {selectedPlan.dietPlan.meals.map((meal) => (
          <MealPlanSection key={meal.id} meal={meal} />
        ))}
      </View>

      <PlanNotesCard items={noteItems} />
      <SupplementPlanCard supplements={selectedPlan.dietPlan.supplements} />

      <View
        style={{
          alignItems: "center",
          backgroundColor: "rgba(244,122,32,0.12)",
          borderColor: "rgba(244,122,32,0.18)",
          borderRadius: 20,
          borderWidth: 1,
          flexDirection: "row",
          gap: 10,
          padding: 14,
        }}
      >
        <Sparkles color={theme.colors.primary} size={18} strokeWidth={2.1} />
        <Text style={{ color: theme.colors.textMuted, flex: 1, fontSize: 12.5 }}>
          {isEditable
            ? "Quando este ciclo for concluído, crie um novo plano para assumir como plano atual do aluno."
            : "Este ciclo já foi concluído e permanece apenas para consulta histórica."}
        </Text>
      </View>
    </AppChrome>
  );
}
