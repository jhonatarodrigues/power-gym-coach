import { Text, View } from "react-native";
import { CalendarDays, Clock3 } from "lucide-react-native";

import { useAppTheme } from "@/theme";

interface PlanSummaryCardProps {
  endDate: string;
  progress: number;
  remainingDays: number;
  startDate: string;
  statusLabel: string;
  title: string;
}

export function PlanSummaryCard({
  endDate,
  progress,
  remainingDays,
  startDate,
  statusLabel,
  title,
}: PlanSummaryCardProps) {
  const { theme } = useAppTheme();
  const progressWidth = `${Math.max(0, Math.min(progress, 100))}%` as const;

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 22,
        borderWidth: 1,
        gap: 16,
        padding: 16,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700" }}>{title}</Text>
        <Text style={{ color: theme.colors.success, fontSize: 13, fontWeight: "700" }}>
          {statusLabel}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ gap: 6 }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 6 }}>
            <CalendarDays color={theme.colors.textMuted} size={14} />
            <Text style={{ color: theme.colors.textMuted, fontSize: 11 }}>Início</Text>
          </View>
          <Text style={{ color: theme.colors.text, fontSize: 12.5 }}>{startDate}</Text>
        </View>
        <View style={{ gap: 6 }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 6 }}>
            <CalendarDays color={theme.colors.textMuted} size={14} />
            <Text style={{ color: theme.colors.textMuted, fontSize: 11 }}>Término</Text>
          </View>
          <Text style={{ color: theme.colors.text, fontSize: 12.5 }}>{endDate}</Text>
        </View>
        <View style={{ gap: 6 }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 6 }}>
            <Clock3 color={theme.colors.textMuted} size={14} />
            <Text style={{ color: theme.colors.textMuted, fontSize: 11 }}>Dias restantes</Text>
          </View>
          <Text style={{ color: theme.colors.text, fontSize: 12.5 }}>{remainingDays} dias</Text>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: theme.colors.text, fontSize: 14, fontWeight: "600" }}>
            Progresso do plano
          </Text>
          <Text style={{ color: theme.colors.text, fontSize: 14, fontWeight: "700" }}>
            {progress}%
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: theme.radius.pill,
            height: 8,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: theme.radius.pill,
              height: "100%",
              width: progressWidth,
            }}
          />
        </View>
      </View>
    </View>
  );
}
