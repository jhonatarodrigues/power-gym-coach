import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

import { useAppTheme } from "@/theme";

interface PlanModuleCardProps {
  icon: ReactNode;
  subtitle: string;
  title: string;
}

export function PlanModuleCard({
  icon,
  subtitle,
  title,
}: PlanModuleCardProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: "row",
        gap: 14,
        paddingHorizontal: 16,
        paddingVertical: 18,
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.04)",
          borderRadius: theme.radius.pill,
          height: 44,
          justifyContent: "center",
          width: 44,
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={{ color: theme.colors.text, fontSize: 17, fontWeight: "600" }}>{title}</Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>{subtitle}</Text>
      </View>
      <ChevronRight color={theme.colors.primary} size={18} />
    </View>
  );
}
