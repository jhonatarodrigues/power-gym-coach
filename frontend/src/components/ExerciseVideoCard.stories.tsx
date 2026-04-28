import type { Meta, StoryObj } from "@storybook/react-native";

import { ExerciseVideoCard } from "./ExerciseVideoCard";

const meta = {
  title: "Components/ExerciseVideoCard",
  component: ExerciseVideoCard,
  args: {
    title: "Supino reto com barra",
    description: "Video gravado pelo professor para orientar a execucao correta.",
    available: true,
  },
} satisfies Meta<typeof ExerciseVideoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Available: Story = {};

export const Empty: Story = {
  args: {
    available: false,
  },
};
