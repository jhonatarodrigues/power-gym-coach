import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface TimelineEventRowProps {
  color: string;
  date: string;
  subtitle: string;
  title: string;
}

export function TimelineEventRow({
  color,
  date,
  subtitle,
  title,
}: TimelineEventRowProps) {
  const { theme } = useAppTheme();

  return (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <View style={{ alignItems: "center", width: 16 }}>
        <View
          style={{
            backgroundColor: color,
            borderColor: "#FFFFFF",
            borderRadius: theme.radius.pill,
            borderWidth: 2,
            height: 10,
            marginTop: 5,
            width: 10,
          }}
        />
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            flex: 1,
            marginTop: 4,
            width: 1.5,
          }}
        />
      </View>
      <View style={{ flex: 1, gap: 2, paddingBottom: 16 }}>
        <Text style={{ color: theme.colors.textMuted, fontSize: 11.5 }}>{date}</Text>
        <Text style={{ color: theme.colors.text, fontSize: 13.5, fontWeight: "600" }}>
          {title}
        </Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{subtitle}</Text>
      </View>
    </View>
  );
}
