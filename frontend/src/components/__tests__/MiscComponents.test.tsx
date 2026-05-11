import type { StudentJourneyEvent } from "@/repository/contracts";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { AppThemeProvider } from "@/theme";

import { ComparisonCard } from "@/components/ComparisonCard";
import { DashboardHero } from "@/components/DashboardHero";
import { DecisionCard } from "@/components/DecisionCard";
import { EmptyState } from "@/components/EmptyState";
import { ExerciseItem } from "@/components/ExerciseItem";
import { ExerciseVideoCard } from "@/components/ExerciseVideoCard";
import { FoodCheckRow } from "@/components/FoodCheckRow";
import { FoodPickerItem } from "@/components/FoodPickerItem";
import { Header } from "@/components/Header";
import { InlineAlertBanner } from "@/components/InlineAlertBanner";
import { JourneyTimelineCard } from "@/components/JourneyTimelineCard";
import { MealProgressRow } from "@/components/MealProgressRow";
import { MetricCard } from "@/components/MetricCard";
import { MiniBarChart } from "@/components/MiniBarChart";
import { PasswordField } from "@/components/PasswordField";
import { PendingAlertCard } from "@/components/PendingAlertCard";
import { PlanModuleCard } from "@/components/PlanModuleCard";
import { PlanSummaryCard } from "@/components/PlanSummaryCard";
import { ProgressLineCard } from "@/components/ProgressLineCard";
import { Screen } from "@/components/Screen";
import { Showcase } from "@/components/Showcase";
import { StatusBadge } from "@/components/StatusBadge";
import { TextField } from "@/components/TextField";
import { WaterDropProgress } from "@/components/WaterDropProgress";
import { BrandLogo } from "@/components/BrandLogo";
import { WorkoutExerciseCheckItem } from "@/components/WorkoutExerciseCheckItem";
import { WorkoutProgressCard } from "@/components/WorkoutProgressCard";
import { AppBottomNav } from "@/components/AppBottomNav";

const Stack = createNativeStackNavigator();

describe("misc components", () => {
  it("renders empty state with action", () => {
    renderWithProviders(
      <EmptyState
        title="Sem dados"
        description="Nada encontrado."
        actionLabel="Criar agora"
      />
    );

    expect(screen.getByText("Sem dados")).toBeTruthy();
    expect(screen.getByText("Criar agora")).toBeTruthy();
  });

  it("renders empty state without action and header without subtitle", () => {
    const { rerender } = renderWithProviders(
      <EmptyState title="Sem dados" description="Nada encontrado." />
    );

    expect(screen.queryByText("Criar agora")).toBeNull();

    rerender(<Header title="Titulo simples" />);

    expect(screen.getByText("Titulo simples")).toBeTruthy();
    expect(screen.getByText("Menu")).toBeTruthy();
    fireEvent.press(screen.getByText("Menu"));
  });

  it("toggles the password field helper text", () => {
    renderWithProviders(<PasswordField label="Senha" placeholder="Digite" />);

    expect(screen.getByText("Mostrar senha")).toBeTruthy();
    fireEvent.press(screen.getByText("Mostrar senha"));
    expect(screen.getByText("Ocultar senha")).toBeTruthy();
  });

  it("renders exercise video states with and without availability", () => {
    const { rerender } = renderWithProviders(
      <ExerciseVideoCard title="Supino" available videoLabel="Video demonstrativo" />
    );

    expect(screen.getByText("Video demonstrativo")).toBeTruthy();

    rerender(<ExerciseVideoCard title="Supino" available={false} />);

    expect(screen.getByText("Sem video")).toBeTruthy();
  });

  it("renders exercise item and food picker variant states", () => {
    const { rerender } = renderWithProviders(
      <ExerciseItem
        name="Supino"
        muscleGroup="Peito"
        equipment="Barra"
        instructions="Controlar a descida."
        badgeLabel="Base"
        hasVideo
      />
    );

    expect(screen.getByText("Video demonstrativo disponivel")).toBeTruthy();
    expect(screen.getByText("Base")).toBeTruthy();

    rerender(
      <FoodPickerItem
        name="Banana"
        baseLabel="1 unidade"
        calories={98}
        carbs={26}
        protein={1.3}
        fat={0.1}
      />
    );

    expect(screen.getByText("1 unidade")).toBeTruthy();

    rerender(
      <ExerciseItem
        name="Supino"
        muscleGroup="Peito"
        equipment="Barra"
        hasVideo={false}
      />
    );

    expect(screen.getByText("Sem video cadastrado")).toBeTruthy();
  });

  it("renders metric card without trend", () => {
    renderWithProviders(<MetricCard label="status" value="10" />);

    expect(screen.getByText("status")).toBeTruthy();
    expect(screen.queryByText("+1")).toBeNull();
  });

  it("renders the design showcase", () => {
    renderWithProviders(<Showcase />);

    expect(screen.getByText("Power Gym Coach UI")).toBeTruthy();
    expect(screen.getByText("Criar novo treino")).toBeTruthy();
    expect(screen.getByText("Nenhum treino criado")).toBeTruthy();
  });

  it("renders brand logo without wordmark and screen without scroll", () => {
    renderWithProviders(
      <Screen scrollable={false}>
        <BrandLogo showWordmark={false} />
      </Screen>
    );

    expect(screen.queryByText("Power Gym Coach")).toBeNull();
  });

  it("renders brand logo with subtitle when wordmark is visible", () => {
    renderWithProviders(<BrandLogo size="lg" subtitle="Painel operacional" />);

    expect(screen.getByText("Power Gym Coach")).toBeTruthy();
    expect(screen.getByText("Painel operacional")).toBeTruthy();
  });

  it("renders text field without optional label and hint", () => {
    renderWithProviders(<TextField placeholder="Livre" />);

    expect(screen.getByPlaceholderText("Livre")).toBeTruthy();
  });

  it("renders the new journey components", () => {
    const event: StudentJourneyEvent = {
      id: "journey-1",
      date: "2026-04-30",
      domain: "exam",
      title: "Upload realizado",
      description: "Arquivo enviado pelo aluno.",
      highlight: "Status: sent",
    };

    renderWithProviders(
      <>
        <StatusBadge label="Pending" tone="warning" />
        <DecisionCard
          title="Decisao"
          description="Descricao curta."
          highlight="Destaque"
          badgeLabel="Plan"
        />
        <PendingAlertCard
          title="Pendencias"
          count={2}
          description="Itens em aberto."
          actionLabel="Abrir"
        />
        <JourneyTimelineCard event={event} />
        <ComparisonCard
          title="Peso"
          currentValue="63.1 kg"
          previousValue="61.8 kg"
          deltaLabel="+1.3 kg em relacao ao ultimo registro"
          trendLabel="ganho de peso"
        />
      </>
    );

    expect(screen.getByText("Pending")).toBeTruthy();
    expect(screen.getByText("Decisao")).toBeTruthy();
    expect(screen.getByText("Pendencias")).toBeTruthy();
    expect(screen.getByText("Upload realizado")).toBeTruthy();
    expect(screen.getByText("Peso")).toBeTruthy();
  });

  it("renders the new dashboard visualization components", () => {
    renderWithProviders(
      <>
        <DashboardHero
          accentLabel="Operacao do dia"
          eyebrow="Coach"
          stats={[
            { label: "Alunos", value: "2" },
            { label: "Planos", value: "1" },
          ]}
          subtitle="Resumo rapido da operacao."
          title="Painel limpo"
        />
        <ProgressLineCard
          currentLabel="1200 kcal"
          helper="Meta de 2000 kcal."
          progress={0.6}
          targetLabel="800 kcal restantes"
          title="Calorias do dia"
        />
        <MiniBarChart
          description="Leitura compacta."
          items={[
            { label: "Ref 1", value: 1, hint: "itens" },
            { label: "Ref 2", value: 3, hint: "itens" },
          ]}
          title="Consumo por refeicao"
        />
      </>
    );

    expect(screen.getByText("Painel limpo")).toBeTruthy();
    expect(screen.getByText("60% concluido")).toBeTruthy();
    expect(screen.getByText("Consumo por refeicao")).toBeTruthy();
  });

  it("renders new approved-layout support components", () => {
    const onWorkoutPress = jest.fn();
    const onFoodPress = jest.fn();
    const onNavPress = jest.fn();

    renderWithProviders(
      <>
        <WorkoutExerciseCheckItem
          checked
          hasVideo
          instructions="Controle a execução."
          onPress={onWorkoutPress}
          subtitle="4 séries x 12 reps"
          title="Supino reto"
        />
        <WorkoutExerciseCheckItem
          checked={false}
          onPress={onWorkoutPress}
          subtitle="3 séries x 15 reps"
          title="Crucifixo"
        />
        <FoodCheckRow calories={210} checked label="Arroz integral (150g)" onPress={onFoodPress} />
        <FoodCheckRow calories={120} label="Feijão (100g)" />
        <MealProgressRow consumed={420} label="Ref 1 - Café da manhã" total={500} />
        <MealProgressRow consumed={0} label="Ref 2 - Ceia" total={0} />
        <WaterDropProgress consumedLiters={1.8} targetLiters={3} />
        <WaterDropProgress consumedLiters={4} targetLiters={3} />
        <PlanSummaryCard
          endDate="23/05/2026"
          progress={140}
          remainingDays={14}
          startDate="23/04/2026"
          statusLabel="Ativo"
          title="Plano atual"
        />
        <PlanModuleCard
          icon={<BrandLogo showWordmark={false} />}
          subtitle="Plano alimentar personalizado"
          title="Dieta"
        />
        <WorkoutProgressCard
          completed={6}
          completionPercentage={60}
          estimatedMinutesLeft={45}
          total={10}
        />
        <AppBottomNav
          items={[
            {
              key: "dashboard",
              label: "Dashboard",
              active: true,
              icon: <BrandLogo showWordmark={false} />,
            },
            {
              key: "alunos",
              label: "Alunos",
              icon: <BrandLogo showWordmark={false} />,
              onPress: onNavPress,
            },
          ]}
        />
      </>
    );

    expect(screen.getByText("Controle a execução.")).toBeTruthy();
    expect(screen.getByText("Arroz integral (150g)")).toBeTruthy();
    expect(screen.getByText("420 / 500 kcal")).toBeTruthy();
    expect(screen.getByText("0%")).toBeTruthy();
    expect(screen.getByText("1.8 / 3.0 L")).toBeTruthy();
    expect(screen.getByText("Plano atual")).toBeTruthy();
    expect(screen.getByText("Supino reto")).toBeTruthy();
    expect(screen.getByText("6/10")).toBeTruthy();

    fireEvent.press(screen.getByText("Supino reto"));
    fireEvent.press(screen.getByText("Arroz integral (150g)"));
    fireEvent.press(screen.getByLabelText("Alunos"));

    expect(onWorkoutPress).toHaveBeenCalled();
    expect(onFoodPress).toHaveBeenCalled();
    expect(onNavPress).toHaveBeenCalled();
  });

  it("renders dashboard visualization components without optional props", () => {
    renderWithProviders(
      <>
        <DashboardHero
          stats={[{ label: "Alunos", value: "0" }]}
          subtitle="Resumo sem destaque opcional."
          title="Painel compacto"
        />
        <ProgressLineCard
          currentLabel="2/2"
          progress={1.5}
          title="Treino concluido"
          tone="warning"
        />
        <MiniBarChart
          color="#22C55E"
          items={[
            { label: "Ref 1", value: 0 },
            { label: "Ref 2", value: 2 },
          ]}
          title="Mini grafico simples"
        />
        <PendingAlertCard count={0} description="Nada pendente." title="Tudo certo" />
        <InlineAlertBanner
          description="Somente leitura."
          icon={<BrandLogo showWordmark={false} />}
          title="Alerta discreto"
        />
      </>
    );

    expect(screen.getByText("Painel compacto")).toBeTruthy();
    expect(screen.getByText("100% concluido")).toBeTruthy();
    expect(screen.getByText("Mini grafico simples")).toBeTruthy();
    expect(screen.getByText("Alerta discreto")).toBeTruthy();
  });

  it("renders header with back action when there is navigation history", () => {
    const PlaceholderScreen = () => null;

    render(
      <AppThemeProvider>
        <NavigationContainer
          initialState={{
            index: 1,
            routes: [{ name: "Home" }, { name: "Detalhes" }],
          }}
        >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={PlaceholderScreen} name="Home" />
            <Stack.Screen name="Detalhes">
              {() => <Header title="Detalhes" />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </AppThemeProvider>
    );

    expect(screen.getByText("Voltar")).toBeTruthy();
    fireEvent.press(screen.getByText("Voltar"));
  });
});
