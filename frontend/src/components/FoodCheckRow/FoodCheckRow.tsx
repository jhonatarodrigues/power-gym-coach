import { Pressable, Text, View } from "react-native";
import { CheckCircle2, Circle, Square } from "lucide-react-native";

import { useAppTheme } from "@/theme";

interface FoodCheckRowProps {
  calories: number;
  checked?: boolean;
  label: string;
  onPress?: () => void;
}

export function FoodCheckRow({
  calories,
  checked = false,
  label,
  onPress,
}: FoodCheckRowProps) {
  const { theme } = useAppTheme();
  const StatusIcon = checked ? CheckCircle2 : Circle;

  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        paddingVertical: 4,
      }}
    >
      <Square color={theme.colors.textMuted} size={12} strokeWidth={1.7} />
      <Text style={{ color: theme.colors.textMuted, flex: 1, fontSize: 12.5 }}>{label}</Text>
      <Text style={{ color: theme.colors.text, fontSize: 12.5 }}>{calories} kcal</Text>
      <StatusIcon
        color={checked ? theme.colors.success : theme.colors.textMuted}
        size={15}
        strokeWidth={2}
      />
    </Pressable>
  );
}
