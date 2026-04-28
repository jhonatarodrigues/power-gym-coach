import type { Meta, StoryObj } from "@storybook/react-native";

import { PasswordField } from "./PasswordField";
import { TextField } from "./TextField";

const meta = {
  title: "Components/Inputs",
  component: TextField,
  args: {
    label: "Nome do aluno",
    placeholder: "Ex.: Ana Beatriz",
    hint: "Campo base para formularios do app.",
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const Password: Story = {
  render: (args) => (
    <PasswordField
      {...args}
      hint="Senha temporaria do acesso do aluno."
      label="Senha"
      placeholder="Digite a senha"
    />
  ),
};
