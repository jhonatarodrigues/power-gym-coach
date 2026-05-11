import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface AppBottomNavItem {
  icon: ReactNode;
  key: string;
  label: string;
  onPress?: () => void;
  active?: boolean;
}

interface AppBottomNavProps {
  items: AppBottomNavItem[];
}

export function AppBottomNav({ items }: AppBottomNavProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: 60,
      }}
    >
      {items.map((item) => (
        <Pressable
          accessibilityLabel={item.label}
          key={item.key}
          onPress={item.onPress}
          style={{
            alignItems: "center",
            flex: 1,
            gap: 4,
            justifyContent: "center",
            paddingVertical: 6,
          }}
        >
          {item.icon}
          <Text
            numberOfLines={1}
            style={{
              color: item.active ? theme.colors.primary : theme.colors.textMuted,
              fontSize: 10,
              fontWeight: item.active ? "700" : "500",
            }}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
