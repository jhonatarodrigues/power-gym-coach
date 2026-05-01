import { Text, View } from "react-native";

import { Card } from "@/components/Card";
import { useAppTheme } from "@/theme";

interface MiniBarChartItem {
  label: string;
  value: number;
  hint?: string;
}

interface MiniBarChartProps {
  title: string;
  description?: string;
  items: MiniBarChartItem[];
  color?: string;
}

export function MiniBarChart({
  title,
  description,
  items,
  color,
}: MiniBarChartProps) {
  const { theme } = useAppTheme();
  const maxValue = Math.max(...items.map((item) => item.value), 1);
  const barColor = color ?? theme.colors.primary;

  return (
    <Card>
      <View style={{ gap: theme.spacing.lg }}>
        <View style={{ gap: theme.spacing.xs }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.body,
              fontWeight: "700",
            }}
          >
            {title}
          </Text>
          {description ? (
            <Text
              style={{
                color: theme.colors.textMuted,
                fontSize: theme.typography.caption,
              }}
            >
              {description}
            </Text>
          ) : null}
        </View>

        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            gap: theme.spacing.md,
            height: 126,
            marginTop: theme.spacing.sm,
            paddingTop: theme.spacing.sm,
          }}
        >
          {items.map((item) => {
            const height = Math.max(24, (item.value / maxValue) * 96);

            return (
              <View
                key={item.label}
                style={{
                  alignItems: "center",
                  flex: 1,
                  gap: theme.spacing.sm,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: theme.typography.caption,
                    fontWeight: "700",
                  }}
                >
                  {item.value}
                </Text>
                <View
                  style={{
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.radius.pill,
                    height: 96,
                    justifyContent: "flex-end",
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: barColor,
                      borderRadius: theme.radius.pill,
                      height,
                      opacity: item.value === 0 ? 0.3 : 1,
                      width: "100%",
                    }}
                  />
                </View>
                <View style={{ alignItems: "center", gap: 2 }}>
                  <Text
                    style={{
                      color: theme.colors.textMuted,
                      fontSize: theme.typography.caption,
                      fontWeight: "700",
                    }}
                  >
                    {item.label}
                  </Text>
                  {item.hint ? (
                    <Text
                      style={{
                        color: theme.colors.textMuted,
                        fontSize: 11,
                      }}
                    >
                      {item.hint}
                    </Text>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </Card>
  );
}
