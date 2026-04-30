import type { Meta, StoryObj } from "@storybook/react-native";

import { Header } from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
  args: {
    title: "Power Gym Coach",
    subtitle: "Acompanhe alunos, treinos e resultados em um unico lugar.",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
