import type { Meta, StoryObj } from "@storybook/react-native";

import { currentPlanMock } from "@/repository/mock";

import { SupplementCard } from "./SupplementCard";

const meta = {
  title: "Components/SupplementCard",
  component: SupplementCard,
  args: {
    supplement: currentPlanMock.dietPlan.supplements[0],
  },
} satisfies Meta<typeof SupplementCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
