import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface InlineAlertBannerProps {
  actionIcon?: ReactNode;
  description: string;
  icon: ReactNode;
  title: string;
}

export function InlineAlertBanner({
  actionIcon,
  description,
  icon,
  title,
}: InlineAlertBannerProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "rgba(244,122,32,0.16)",
        borderColor: "rgba(244,122,32,0.24)",
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: "row",
        gap: 14,
        paddingHorizontal: 16,
        paddingVertical: 15,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>{description}</Text>
      </View>
      {actionIcon ? <View>{actionIcon}</View> : null}
    </View>
  );
}
