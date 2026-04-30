import type { Meta, StoryObj } from "@storybook/react-native";

import { DecisionCard } from "./DecisionCard";

const meta = {
  title: "Components/DecisionCard",
  component: DecisionCard,
  args: {
    title: "Leitura tecnica mais recente",
    description: "Boa resposta ao plano de pernas com melhora de consistencia.",
    highlight: "Ajustar carboidratos no almoco e revisar volume de quadriceps.",
    badgeLabel: "Assessment",
    actionLabel: "Abrir avaliacao",
  },
} satisfies Meta<typeof DecisionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
