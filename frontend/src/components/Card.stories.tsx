import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

import { Card } from "./Card";

function CardPreview() {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.sm }}>
        <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
          Alunos ativos
        </Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 32 }}>
          24
        </Text>
      </View>
    </Card>
  );
}

const meta = {
  title: "Components/Card",
  component: CardPreview,
} satisfies Meta<typeof CardPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
