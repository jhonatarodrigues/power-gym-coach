import type { Meta, StoryObj } from "@storybook/react-native";

import { JourneyTimelineCard } from "./JourneyTimelineCard";

const meta = {
  title: "Components/JourneyTimelineCard",
  component: JourneyTimelineCard,
  args: {
    event: {
      id: "timeline-1",
      date: "2026-04-30",
      domain: "assessment",
      title: "Devolutiva da avaliacao",
      description: "Resumo tecnico da ultima avaliacao corporal.",
      highlight: "Proximo passo: ajustar o plano atual.",
    },
  },
} satisfies Meta<typeof JourneyTimelineCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
