import type { Meta, StoryObj } from "@storybook/react-native";

import { ComparisonCard } from "./ComparisonCard";

const meta = {
  title: "Components/ComparisonCard",
  component: ComparisonCard,
  args: {
    title: "Peso corporal",
    currentValue: "63.1 kg",
    previousValue: "61.8 kg",
    deltaLabel: "+1.3 kg em relacao ao ultimo registro",
    trendLabel: "ganho de peso",
    tone: "info",
  },
} satisfies Meta<typeof ComparisonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
