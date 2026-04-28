import type { Meta, StoryObj } from "@storybook/react-native";

import { Showcase } from "./Showcase";

const meta = {
  title: "Foundations/Showcase",
  component: Showcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Showcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
