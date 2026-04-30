import type { Meta, StoryObj } from "@storybook/react-native";

import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  args: {
    title: "Nenhum aluno encontrado",
    description: "Crie o primeiro aluno para comecar a montar treinos e avaliacoes.",
    actionLabel: "Adicionar aluno",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
