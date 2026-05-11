import { Pressable, Text, View } from "react-native";
import { ArrowUpRight, CalendarDays } from "lucide-react-native";

import { StatusBadge } from "@/components/StatusBadge";
import { useAppTheme } from "@/theme";

interface PlanListCardProps {
  dateLabel: string;
  onPress: () => void;
  statusLabel: string;
  statusTone: "default" | "success" | "warning" | "info";
  subtitle: string;
  title: string;
}

export function PlanListCard({
  dateLabel,
  onPress,
  statusLabel,
  statusTone,
  subtitle,
  title,
}: PlanListCardProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      accessibilityLabel={`Abrir plano ${title}`}
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 22,
        borderWidth: 1,
        gap: 14,
        opacity: pressed ? 0.95 : 1,
        padding: 16,
      })}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StatusBadge label={statusLabel} tone={statusTone} />
        <ArrowUpRight color={theme.colors.primary} size={16} strokeWidth={2.1} />
      </View>

      <View style={{ gap: 6 }}>
        <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "700" }}>{title}</Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>{subtitle}</Text>
      </View>

      <View style={{ alignItems: "center", flexDirection: "row", gap: 8 }}>
        <CalendarDays color={theme.colors.textMuted} size={14} strokeWidth={2} />
        <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{dateLabel}</Text>
      </View>
    </Pressable>
  );
}
