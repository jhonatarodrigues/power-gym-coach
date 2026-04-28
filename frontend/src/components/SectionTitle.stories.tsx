import type { Meta, StoryObj } from "@storybook/react-native";

import { SectionTitle } from "./SectionTitle";

const meta = {
  title: "Components/SectionTitle",
  component: SectionTitle,
  args: {
    title: "Alunos recentes",
    description: "Resumo rapido da carteira ativa.",
    actionLabel: "Ver todos",
  },
} satisfies Meta<typeof SectionTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
