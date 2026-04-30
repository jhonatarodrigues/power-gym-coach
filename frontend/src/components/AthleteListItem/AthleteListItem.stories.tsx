import type { Meta, StoryObj } from "@storybook/react-native";

import { AthleteListItem } from "./AthleteListItem";

const meta = {
  title: "Components/AthleteListItem",
  component: AthleteListItem,
  args: {
    name: "Marina Costa",
    focus: "Hipertrofia e condicionamento",
    status: "Em dia",
  },
} satisfies Meta<typeof AthleteListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
