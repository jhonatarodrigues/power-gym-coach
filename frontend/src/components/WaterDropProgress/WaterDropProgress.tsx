import { Text, View } from "react-native";
import { Droplets } from "lucide-react-native";

import { useAppTheme } from "@/theme";

interface WaterDropProgressProps {
  consumedLiters: number;
  targetLiters: number;
}

export function WaterDropProgress({
  consumedLiters,
  targetLiters,
}: WaterDropProgressProps) {
  const { theme } = useAppTheme();
  const totalDrops = 8;
  const filledDrops = Math.round((consumedLiters / Math.max(targetLiters, 0.1)) * totalDrops);

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 2 }}>
        <Text style={{ color: theme.colors.primary, fontSize: 12.5, fontWeight: "600" }}>
          Água
        </Text>
        <Text style={{ color: theme.colors.text, fontSize: 13 }}>
          {consumedLiters.toFixed(1)} / {targetLiters.toFixed(1)} L
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 6 }}>
        {Array.from({ length: totalDrops }).map((_, index) => (
          <Droplets
            color={index < filledDrops ? theme.colors.primary : "rgba(255,255,255,0.18)"}
            fill={index < filledDrops ? theme.colors.primary : "transparent"}
            key={`drop-${index}`}
            size={16}
          />
        ))}
      </View>
    </View>
  );
}
