import type { Meta, StoryObj } from "@storybook/react-native";

import { WorkoutExerciseCheckItem } from "./WorkoutExerciseCheckItem";

const meta = {
  title: "Components/WorkoutExerciseCheckItem",
  component: WorkoutExerciseCheckItem,
  args: {
    title: "Supino reto com barra",
    subtitle: "4x8-10 • 90s",
    instructions: "Priorizar controle na descida.",
    hasVideo: true,
    checked: false,
    onPress: () => undefined,
  },
} satisfies Meta<typeof WorkoutExerciseCheckItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Completed: Story = {
  args: {
    checked: true,
  },
};
