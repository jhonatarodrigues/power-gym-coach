import type { Meta, StoryObj } from "@storybook/react-native";

import { currentPlanMock } from "@/repository/mock";

import { MealCard } from "./MealCard";

const meta = {
  title: "Components/MealCard",
  component: MealCard,
  args: {
    meal: currentPlanMock.dietPlan.meals[0],
  },
} satisfies Meta<typeof MealCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
