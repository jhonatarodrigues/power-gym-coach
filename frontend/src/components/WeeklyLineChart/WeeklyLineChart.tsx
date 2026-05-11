import { Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from "react-native-svg";

import { useAppTheme } from "@/theme";

interface WeeklyLineChartPoint {
  label: string;
  value: number;
}

interface WeeklyLineChartProps {
  items: WeeklyLineChartPoint[];
  periodLabel: string;
}

function createSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length === 0) {
    return "";
  }

  let path = `M ${points[0]?.x ?? 0} ${points[0]?.y ?? 0}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];

    if (!current || !next) {
      continue;
    }

    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;

    path += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
  }

  const last = points[points.length - 1];

  if (!last) {
    return path;
  }

  path += ` T ${last.x} ${last.y}`;
  return path;
}

export function WeeklyLineChart({
  items,
  periodLabel,
}: WeeklyLineChartProps) {
  const { theme } = useAppTheme();
  const chartWidth = 290;
  const chartHeight = 164;
  const paddingHorizontal = 16;
  const paddingVertical = 18;
  const graphWidth = chartWidth - paddingHorizontal * 2;
  const graphHeight = chartHeight - 48;
  const maxValue = 100;
  const selectedIndex = items.reduce(
    (bestIndex, item, index) => (item.value > items[bestIndex]!.value ? index : bestIndex),
    0
  );
  const points = items.map((item, index) => ({
    x: paddingHorizontal + (graphWidth / Math.max(items.length - 1, 1)) * index,
    y: paddingVertical + graphHeight - (item.value / maxValue) * graphHeight,
  }));

  const linePath = createSmoothPath(points);
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const areaPath =
    firstPoint && lastPoint
      ? `${linePath} L ${lastPoint.x} ${paddingVertical + graphHeight} L ${firstPoint.x} ${
          paddingVertical + graphHeight
        } Z`
      : "";
  const selectedPoint = points[selectedIndex];
  const selectedItem = items[selectedIndex];

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 22,
        borderWidth: 1,
        gap: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "600" }}>
          Engajamento semanal
        </Text>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.06)",
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 7,
          }}
        >
          <Text style={{ color: theme.colors.text, fontSize: 12.5 }}>{periodLabel}</Text>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Svg height={chartHeight} width={chartWidth}>
          <Defs>
            <LinearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <Stop offset="0%" stopColor="#F47A20" stopOpacity="0.28" />
              <Stop offset="100%" stopColor="#F47A20" stopOpacity="0.02" />
            </LinearGradient>
          </Defs>

          {[0, 25, 50, 75, 100].map((tick) => {
            const y = paddingVertical + graphHeight - (tick / maxValue) * graphHeight;

            return (
              <View key={`grid-${tick}`}>
                <Line
                  stroke="rgba(255,255,255,0.08)"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                  x1={paddingHorizontal}
                  x2={chartWidth - paddingHorizontal}
                  y1={y}
                  y2={y}
                />
              </View>
            );
          })}

          <Rect
            fill="url(#chartGradient)"
            height={graphHeight}
            rx={18}
            ry={18}
            width={graphWidth}
            x={paddingHorizontal}
            y={paddingVertical}
          />

          <Path d={areaPath} fill="url(#chartGradient)" />
          <Path d={linePath} fill="none" stroke="#F47A20" strokeWidth={3} />

          {points.map((point, index) => (
            <Circle
              cx={point.x}
              cy={point.y}
              fill={index === selectedIndex ? "#FFFFFF" : "#F47A20"}
              key={`point-${items[index]?.label ?? index}`}
              r={index === selectedIndex ? 5 : 4}
              stroke="#F47A20"
              strokeWidth={2}
            />
          ))}

          {selectedPoint && selectedItem ? (
            <>
              <Rect
                fill="#191C1F"
                height={34}
                rx={10}
                ry={10}
                width={60}
                x={Math.max(0, selectedPoint.x - 30)}
                y={Math.max(0, selectedPoint.y - 46)}
              />
              <SvgText
                fill="#F3F4F6"
                fontSize="12"
                fontWeight="700"
                x={selectedPoint.x}
                y={Math.max(14, selectedPoint.y - 25)}
                textAnchor="middle"
              >
                {selectedItem.value}%
              </SvgText>
              <SvgText
                fill="#A7AFB7"
                fontSize="10"
                x={selectedPoint.x}
                y={Math.max(24, selectedPoint.y - 12)}
                textAnchor="middle"
              >
                {selectedItem.label}
              </SvgText>
            </>
          ) : null}
        </Svg>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: -10,
            width: chartWidth - paddingHorizontal * 2,
          }}
        >
          {items.map((item) => (
            <Text
              key={item.label}
              style={{
                color: theme.colors.textMuted,
                fontSize: 11.5,
                width: 28,
              }}
            >
              {item.label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
