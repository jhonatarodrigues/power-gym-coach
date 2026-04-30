import type { Meta, StoryObj } from "@storybook/react-native";

import { MacroSummaryCard } from "./MacroSummaryCard";

const meta = {
  title: "Components/MacroSummaryCard",
  component: MacroSummaryCard,
  args: {
    title: "Resumo diario",
    calories: 1865,
    carbs: 204.3,
    protein: 165.3,
    fat: 44.3,
    note: "Valores mockados do plano atual.",
  },
} satisfies Meta<typeof MacroSummaryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
