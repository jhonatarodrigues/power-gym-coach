import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

import { Card } from "./Card";

interface ExerciseVideoCardProps {
  title: string;
  description?: string;
  videoLabel?: string;
  available?: boolean;
}

export function ExerciseVideoCard({
  title,
  description,
  videoLabel = "Video do professor",
  available = true,
}: ExerciseVideoCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.md }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: available
              ? theme.colors.primaryMuted
              : theme.colors.surfaceAlt,
            borderRadius: theme.radius.md,
            height: 120,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: available ? theme.colors.primary : theme.colors.textMuted,
              fontWeight: "700",
            }}
          >
            {available ? videoLabel : "Sem video"}
          </Text>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.body,
              fontWeight: "700",
            }}
          >
            {title}
          </Text>
          {description ? (
            <Text style={{ color: theme.colors.textMuted }}>{description}</Text>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
