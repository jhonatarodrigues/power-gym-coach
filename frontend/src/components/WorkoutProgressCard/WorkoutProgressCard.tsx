import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { useAppTheme } from "@/theme";

interface WorkoutProgressCardProps {
  completed: number;
  completionPercentage: number;
  estimatedMinutesLeft: number;
  total: number;
}

export function WorkoutProgressCard({
  completed,
  completionPercentage,
  estimatedMinutesLeft,
  total,
}: WorkoutProgressCardProps) {
  const { theme } = useAppTheme();
  const size = 62;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.max(0, Math.min(completionPercentage, 100)) / 100);

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 20,
        borderWidth: 1,
        gap: 16,
        padding: 16,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 13.5, fontWeight: "600" }}>
        Progresso do treino
      </Text>

      <View style={{ alignItems: "center", flexDirection: "row", gap: 16 }}>
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
            <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "700" }}>
              {completed}/{total}
            </Text>
            <Text style={{ color: theme.colors.textMuted, fontSize: 10.5 }}>Exercícios</Text>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ gap: 5 }}>
            <Text style={{ color: theme.colors.primary, fontSize: 18, fontWeight: "700" }}>
              {completionPercentage}%
            </Text>
            <Text style={{ color: theme.colors.textMuted, fontSize: 11 }}>Conclusão</Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700" }}>
              ≈ {estimatedMinutesLeft} min
            </Text>
            <Text style={{ color: theme.colors.textMuted, fontSize: 11 }}>
              Estimativa restante
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
