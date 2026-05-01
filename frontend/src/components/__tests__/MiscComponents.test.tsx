import type { StudentJourneyEvent } from "@/repository/contracts";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { AppThemeProvider } from "@/theme";

import { ComparisonCard } from "@/components/ComparisonCard";
import { DecisionCard } from "@/components/DecisionCard";
import { EmptyState } from "@/components/EmptyState";
import { ExerciseItem } from "@/components/ExerciseItem";
import { ExerciseVideoCard } from "@/components/ExerciseVideoCard";
import { FoodPickerItem } from "@/components/FoodPickerItem";
import { Header } from "@/components/Header";
import { JourneyTimelineCard } from "@/components/JourneyTimelineCard";
import { MetricCard } from "@/components/MetricCard";
import { PasswordField } from "@/components/PasswordField";
import { PendingAlertCard } from "@/components/PendingAlertCard";
import { Screen } from "@/components/Screen";
import { Showcase } from "@/components/Showcase";
import { StatusBadge } from "@/components/StatusBadge";
import { TextField } from "@/components/TextField";
import { BrandLogo } from "@/components/BrandLogo";

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
