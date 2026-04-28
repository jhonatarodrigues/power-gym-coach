import type { Meta, StoryObj } from "@storybook/react-native";

import { historyRecordsMock } from "@/repository/mock";

import { HistoryCard } from "./HistoryCard";

const meta = {
  title: "Components/HistoryCard",
  component: HistoryCard,
  args: {
    record: historyRecordsMock[0],
  },
} satisfies Meta<typeof HistoryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
