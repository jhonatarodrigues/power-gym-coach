import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface AthleteListItemProps {
  name: string;
  focus: string;
  status: string;
  withDivider?: boolean;
}

export function AthleteListItem({
  name,
  focus,
  status,
  withDivider = false,
}: AthleteListItemProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        borderBottomColor: withDivider ? theme.colors.border : "transparent",
        borderBottomWidth: withDivider ? 1 : 0,
        paddingBottom: theme.spacing.md,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: theme.spacing.md,
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
              lineHeight: 18,
            }}
          >
            {focus}
          </Text>
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: theme.colors.primaryMuted,
              borderRadius: theme.radius.pill,
              marginTop: theme.spacing.xs,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 6,
            }}
          >
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
        </View>
      </View>
    </View>
  );
}
