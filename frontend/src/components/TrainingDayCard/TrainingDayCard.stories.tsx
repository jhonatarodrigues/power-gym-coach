import type { Meta, StoryObj } from "@storybook/react-native";

import { currentPlanMock } from "@/repository/mock";

import { TrainingDayCard } from "./TrainingDayCard";

const meta = {
  title: "Components/TrainingDayCard",
  component: TrainingDayCard,
  args: {
    day: currentPlanMock.trainingPlan.days[0],
  },
} satisfies Meta<typeof TrainingDayCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
