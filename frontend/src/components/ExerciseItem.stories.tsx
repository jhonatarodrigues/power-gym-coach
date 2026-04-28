import type { Meta, StoryObj } from "@storybook/react-native";

import { ExerciseItem } from "./ExerciseItem";

const meta = {
  title: "Components/ExerciseItem",
  component: ExerciseItem,
  args: {
    name: "Supino reto com barra",
    muscleGroup: "chest",
    equipment: "barbell",
    instructions: "Controlar a descida e manter escapulas encaixadas.",
    badgeLabel: "Base",
    hasVideo: true,
  },
} satisfies Meta<typeof ExerciseItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    badgeLabel: "Custom",
    name: "Leg press com pausa",
    muscleGroup: "legs",
    equipment: "machine",
  },
};
