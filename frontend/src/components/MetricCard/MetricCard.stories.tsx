import type { Meta, StoryObj } from "@storybook/react-native";

import { MetricCard } from "./MetricCard";

const meta = {
  title: "Components/MetricCard",
  component: MetricCard,
  args: {
    label: "alunos ativos",
    value: "24",
    trend: "+3 esta semana",
  },
} satisfies Meta<typeof MetricCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
