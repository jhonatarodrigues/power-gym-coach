import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { useAppTheme } from "@/theme";

interface CircularProgressLegendItem {
  color: string;
  label: string;
  value: number;
}

interface CircularProgressSummaryProps {
  label: string;
  percentage: number;
  items: CircularProgressLegendItem[];
}

export function CircularProgressSummary({
  label,
  percentage,
  items,
}: CircularProgressSummaryProps) {
  const { theme } = useAppTheme();
  const size = 118;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.max(0, Math.min(percentage, 100)) / 100);

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 22,
        borderWidth: 1,
        gap: 20,
        padding: 16,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 17, fontWeight: "600" }}>
        Progresso médio dos alunos
      </Text>

      <View style={{ alignItems: "center", flexDirection: "row", gap: 18 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Svg height={size} width={size}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              fill="none"
              r={radius}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={strokeWidth}
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              fill="none"
              r={radius}
              stroke={theme.colors.primary}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <View style={{ alignItems: "center", position: "absolute" }}>
            <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700" }}>
              {percentage}%
            </Text>
            <Text style={{ color: theme.colors.textMuted, fontSize: 11 }}>{label}</Text>
          </View>
        </View>

        <View style={{ flex: 1, gap: 14 }}>
          {items.map((item) => (
            <View key={item.label} style={{ gap: 6 }}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: `${item.color}33`,
                    borderRadius: theme.radius.pill,
                    height: 28,
                    width: 28,
                  }}
                />
                <Text style={{ color: theme.colors.text, flex: 1, fontSize: 14 }}>
                  {item.label}
                </Text>
                <Text style={{ color: theme.colors.text, fontSize: 13 }}>{item.value}%</Text>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: theme.radius.pill,
                  height: 7,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    backgroundColor: item.color,
                    borderRadius: theme.radius.pill,
                    height: "100%",
                    width: `${Math.max(0, Math.min(item.value, 100))}%`,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
