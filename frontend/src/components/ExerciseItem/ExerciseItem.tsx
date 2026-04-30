import { Pressable, Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface ExerciseItemProps {
  name: string;
  muscleGroup: string;
  equipment: string;
  instructions?: string;
  badgeLabel?: string;
  hasVideo?: boolean;
  onPress?: () => void;
}

export function ExerciseItem({
  name,
  muscleGroup,
  equipment,
  instructions,
  badgeLabel,
  hasVideo = false,
  onPress,
}: ExerciseItemProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        gap: theme.spacing.sm,
        opacity: pressed ? 0.92 : 1,
        padding: theme.spacing.lg,
      })}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: theme.spacing.md,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
            flex: 1,
            fontSize: theme.typography.body,
            fontWeight: "700",
          }}
        >
          {name}
        </Text>
        {badgeLabel ? (
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.typography.caption,
              fontWeight: "700",
            }}
          >
            {badgeLabel}
          </Text>
        ) : null}
      </View>

      <Text style={{ color: theme.colors.textMuted }}>
        {muscleGroup} / {equipment}
      </Text>

      {instructions ? (
        <Text style={{ color: theme.colors.textMuted }}>{instructions}</Text>
      ) : null}

      <Text
        style={{
          color: hasVideo ? theme.colors.primary : theme.colors.textMuted,
          fontSize: theme.typography.caption,
          fontWeight: "700",
        }}
      >
        {hasVideo ? "Video demonstrativo disponivel" : "Sem video cadastrado"}
      </Text>
    </Pressable>
  );
}
