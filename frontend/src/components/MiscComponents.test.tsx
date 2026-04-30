import type { StudentJourneyEvent } from "@/repository/contracts";
import { fireEvent, screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { DecisionCard } from "./DecisionCard";
import { EmptyState } from "./EmptyState";
import { ExerciseItem } from "./ExerciseItem";
import { FoodPickerItem } from "./FoodPickerItem";
import { Header } from "./Header";
import { ExerciseVideoCard } from "./ExerciseVideoCard";
import { JourneyTimelineCard } from "./JourneyTimelineCard";
import { ComparisonCard } from "./ComparisonCard";
import { MetricCard } from "./MetricCard";
import { PasswordField } from "./PasswordField";
import { PendingAlertCard } from "./PendingAlertCard";
import { Showcase } from "./Showcase";
import { StatusBadge } from "./StatusBadge";
import { TextField } from "./TextField";

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
});
