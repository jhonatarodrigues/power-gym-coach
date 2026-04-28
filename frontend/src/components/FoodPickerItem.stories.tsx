import type { Meta, StoryObj } from "@storybook/react-native";

import { FoodPickerItem } from "./FoodPickerItem";

const meta = {
  title: "Components/FoodPickerItem",
  component: FoodPickerItem,
  args: {
    name: "Arroz branco cozido",
    baseLabel: "100 g",
    calories: 128,
    carbs: 28.1,
    protein: 2.5,
    fat: 0.3,
  },
} satisfies Meta<typeof FoodPickerItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
