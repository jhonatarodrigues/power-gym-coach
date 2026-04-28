import type { Meta, StoryObj } from "@storybook/react-native";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    label: "Criar treino",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    label: "Ver detalhes",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    label: "Salvando",
  },
};
