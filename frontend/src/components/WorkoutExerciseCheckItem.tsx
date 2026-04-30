import { Pressable, Text, View } from "react-native";
import { CheckCircle2, Circle, CirclePlay } from "lucide-react-native";

import { useAppTheme } from "@/theme";

interface WorkoutExerciseCheckItemProps {
  title: string;
  subtitle: string;
  instructions?: string;
  hasVideo?: boolean;
  checked: boolean;
  onPress: () => void;
}

export function WorkoutExerciseCheckItem({
  checked,
  hasVideo = false,
  instructions,
  onPress,
  subtitle,
  title,
}: WorkoutExerciseCheckItemProps) {
  const { theme } = useAppTheme();
  const Icon = checked ? CheckCircle2 : Circle;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: theme.colors.surface,
        borderColor: checked ? theme.colors.primary : theme.colors.border,
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
        }}
      >
        <Icon color={checked ? theme.colors.primary : theme.colors.textMuted} size={20} />
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{title}</Text>
          <Text style={{ color: theme.colors.textMuted }}>{subtitle}</Text>
          {instructions ? (
            <Text style={{ color: theme.colors.textMuted }}>{instructions}</Text>
          ) : null}
        </View>
        {hasVideo ? <CirclePlay color={theme.colors.primary} size={18} /> : null}
      </View>
    </Pressable>
  );
}
