import type { Meta, StoryObj } from "@storybook/react-native";

import { Button } from "./Button";
import { Header } from "./Header";
import { Screen } from "./Screen";

const meta = {
  title: "Components/Screen",
  component: Screen,
} satisfies Meta<typeof Screen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Screen>
      <Header
        subtitle="Tema escuro com laranja como power color."
        title="Dashboard"
      />
      <Button label="Novo aluno" />
    </Screen>
  ),
};
