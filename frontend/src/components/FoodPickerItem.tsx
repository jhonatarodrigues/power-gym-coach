import { Pressable, Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface FoodPickerItemProps {
  name: string;
  baseLabel: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  selected?: boolean;
  onPress?: () => void;
}

export function FoodPickerItem({
  name,
  baseLabel,
  calories,
  carbs,
  protein,
  fat,
  selected = false,
  onPress,
}: FoodPickerItemProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: theme.colors.surface,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
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
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
            flex: 1,
            fontWeight: "700",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: selected ? theme.colors.primary : theme.colors.textMuted,
            fontWeight: "700",
          }}
        >
          {selected ? "Selecionado" : baseLabel}
        </Text>
      </View>

      <Text style={{ color: theme.colors.textMuted }}>
        {calories} kcal / {carbs}C / {protein}P / {fat}G
      </Text>
    </Pressable>
  );
}
