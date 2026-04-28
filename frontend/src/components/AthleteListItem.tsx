import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

import { Card } from "./Card";

interface AthleteListItemProps {
  name: string;
  focus: string;
  status: string;
}

export function AthleteListItem({
  name,
  focus,
  status,
}: AthleteListItemProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: theme.spacing.md,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.primaryMuted,
            borderRadius: theme.radius.pill,
            height: 44,
            justifyContent: "center",
            width: 44,
          }}
        >
          <Text style={{ color: theme.colors.primary, fontWeight: "800" }}>
            {name.slice(0, 1)}
          </Text>
        </View>

        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.body,
              fontWeight: "700",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontSize: theme.typography.caption,
            }}
          >
            {focus}
          </Text>
        </View>

        <Text
          style={{
            color: theme.colors.primary,
            fontSize: theme.typography.caption,
            fontWeight: "700",
          }}
        >
          {status}
        </Text>
      </View>
    </Card>
  );
}
