import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

function TypographyPreview() {
  const { theme } = useAppTheme();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.title,
          fontWeight: "800",
        }}
      >
        Title / Power Gym Coach
      </Text>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.subtitle,
          fontWeight: "700",
        }}
      >
        Subtitle / Personal Dashboard
      </Text>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.body,
        }}
      >
        Body / Texto padrao para conteudo principal.
      </Text>
      <Text
        style={{
          color: theme.colors.textMuted,
          fontSize: theme.typography.caption,
        }}
      >
        Caption / legenda, ajuda e metadados.
      </Text>
    </View>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: TypographyPreview,
} satisfies Meta<typeof TypographyPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
