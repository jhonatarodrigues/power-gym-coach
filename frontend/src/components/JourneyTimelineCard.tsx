import { Text, View } from "react-native";

import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import type { StudentJourneyEvent } from "@/repository/contracts";
import { useAppTheme } from "@/theme";

interface JourneyTimelineCardProps {
  event: StudentJourneyEvent;
}

function getDomainLabel(domain: StudentJourneyEvent["domain"]) {
  if (domain === "assessment") {
    return "Assessment";
  }

  if (domain === "exam") {
    return "Exams";
  }

  if (domain === "progress") {
    return "Progress";
  }

  if (domain === "plan") {
    return "Plan";
  }

  return "History";
}

export function JourneyTimelineCard({ event }: JourneyTimelineCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.sm }}>
        <StatusBadge label={getDomainLabel(event.domain)} tone="info" />
        <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
          {event.date}
        </Text>
        <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
          {event.title}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>{event.description}</Text>
        {event.highlight ? (
          <Text style={{ color: theme.colors.textMuted }}>{event.highlight}</Text>
        ) : null}
      </View>
    </Card>
  );
}
