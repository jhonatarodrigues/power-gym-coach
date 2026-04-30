import type { Meta, StoryObj } from "@storybook/react-native";

import { PendingAlertCard } from "./PendingAlertCard";

const meta = {
  title: "Components/PendingAlertCard",
  component: PendingAlertCard,
  args: {
    title: "Exames em andamento",
    count: 2,
    description: "Itens que ainda exigem acao para fechar o ciclo de revisao.",
    actionLabel: "Abrir exams",
  },
} satisfies Meta<typeof PendingAlertCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
