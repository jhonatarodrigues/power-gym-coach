import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  Apple,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  Menu,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react-native";
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from "react-native-svg";

import { Screen } from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { usePayments } from "@/hooks/usePayments";
import { useAppTheme } from "@/theme";

const brandSymbol = require("../../../assets/brand-symbol.png");

const weeklyEngagement = [
  { label: "Seg", value: 34 },
  { label: "Ter", value: 51 },
  { label: "Qua", value: 38 },
  { label: "Qui", value: 75 },
  { label: "Sex", value: 56 },
  { label: "Sáb", value: 72 },
  { label: "Dom", value: 51 },
];

const highlightedStudents = [
  {
    id: "highlight-1",
    name: "Juliana Mendes",
    goal: "Definição",
    planDate: "23/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "highlight-2",
    name: "Rafael Souza",
    goal: "Hipertrofia",
    planDate: "18/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "highlight-3",
    name: "Carla Oliveira",
    goal: "Emagrecimento",
    planDate: "10/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

export function createSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0]?.x ?? 0} ${points[0]?.y ?? 0}`;
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

  const lastPoint = points[points.length - 1];

  if (!lastPoint) {
    return path;
  }

  path += ` T ${lastPoint.x} ${lastPoint.y}`;

  return path;
}

export function buildAreaPath(points: Array<{ x: number; y: number }>, bottomY: number) {
  if (points.length === 0) {
    return "";
  }

  const first = points[0];
  const last = points[points.length - 1];

  if (!first || !last) {
    return "";
  }

  return `${createSmoothPath(points)} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
}

function SectionLabel({ title, action }: { title: string; action?: string }) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 18,
          fontWeight: "600",
          letterSpacing: -0.2,
        }}
      >
        {title}
      </Text>
      {action ? (
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          {action}
        </Text>
      ) : null}
    </View>
  );
}

function OverviewCard({
  icon,
  label,
  trend,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  trend: string;
  value: string;
}) {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const isCompact = width <= 375;
  const compactIndex = Number(isCompact);
  const labelLines = label.split("\n");

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 22,
        borderWidth: 1,
        flex: 1,
        minHeight: [136, 124][compactIndex],
        paddingHorizontal: [14, 10][compactIndex],
        paddingVertical: [14, 12][compactIndex],
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: [10, 8][compactIndex],
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.04)",
            borderRadius: 20,
            height: [40, 34][compactIndex],
            justifyContent: "center",
            width: [40, 34][compactIndex],
          }}
        >
          {icon}
        </View>

        <View
          style={{
            gap: 4,
            minWidth: 0,
            width: "100%",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: theme.colors.text,
              fontSize: [20, 18][compactIndex],
              fontWeight: "700",
              letterSpacing: -0.4,
              textAlign: "center",
            }}
          >
            {value}
          </Text>
          <View style={{ minHeight: 32, justifyContent: "flex-start" }}>
            {labelLines.map((line) => (
              <Text
                key={line}
                numberOfLines={1}
                style={{
                  color: theme.colors.textMuted,
                  fontSize: [12.5, 11.5][compactIndex],
                  lineHeight: [16, 15][compactIndex],
                  textAlign: "center",
                }}
              >
                {line}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={{ gap: 2, marginTop: "auto", width: "100%" }}>
        <Text
          style={{
            color: "#4ADE80",
            fontSize: [13, 12][compactIndex],
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {trend}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: [11.5, 10.5][compactIndex],
            textAlign: "center",
          }}
        >
          vs mês anterior
        </Text>
      </View>
    </View>
  );
}

function WeeklyEngagementChart() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const isCompact = width <= 375;
  const compactIndex = Number(isCompact);
  const cardWidth = width - [36, 28][compactIndex];
  const svgWidth = cardWidth - [32, 24][compactIndex];
  const svgHeight = [268, 228][compactIndex];
  const leftAxisWidth = [36, 30][compactIndex];
  const topPadding = [20, 16][compactIndex];
  const rightPadding = [10, 8][compactIndex];
  const bottomPadding = [40, 34][compactIndex];
  const chartWidth = svgWidth - leftAxisWidth - rightPadding;
  const chartHeight = svgHeight - topPadding - bottomPadding;
  const chartBottomY = topPadding + chartHeight;
  const stepX = chartWidth / Math.max(weeklyEngagement.length - 1, 1);
  const maxValue = 100;
  const points = weeklyEngagement.map((item, index) => ({
    ...item,
    x: leftAxisWidth + stepX * index,
    y: topPadding + chartHeight - (item.value / maxValue) * chartHeight,
  }));
  const selectedPoint = points[3];
  const gridValues = [100, 75, 50, 25, 0];

  return (
    <View style={{ gap: [16, 12][compactIndex] }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SectionLabel title="Engajamento semanal" />
        <View
          style={{
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.07)",
            borderRadius: 20,
            borderWidth: 1,
            flexDirection: "row",
            gap: 8,
            paddingHorizontal: [16, 12][compactIndex],
            paddingVertical: [10, 8][compactIndex],
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontSize: [15, 13][compactIndex],
              fontWeight: "500",
            }}
          >
            Últimos 7 dias
          </Text>
          <ChevronDown color={theme.colors.textMuted} size={[16, 14][compactIndex]} />
        </View>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: "rgba(255,255,255,0.06)",
          borderRadius: 24,
          borderWidth: 1,
          overflow: "hidden",
          paddingHorizontal: [12, 10][compactIndex],
          paddingVertical: [18, 14][compactIndex],
        }}
      >
        <Svg height={svgHeight} width={svgWidth}>
          <Defs>
            <LinearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <Stop offset="0%" stopColor="#F47A20" stopOpacity="0.28" />
              <Stop offset="100%" stopColor="#F47A20" stopOpacity="0.02" />
            </LinearGradient>
          </Defs>

          {gridValues.map((value) => {
            const y = topPadding + chartHeight - (value / maxValue) * chartHeight;

            return (
              <G key={value}>
                <Line
                  stroke="rgba(255,255,255,0.10)"
                  strokeDasharray="4 6"
                  strokeWidth="1"
                  x1={leftAxisWidth}
                  x2={leftAxisWidth + chartWidth}
                  y1={y}
                  y2={y}
                />
                <SvgText
                  fill={theme.colors.textMuted}
                  fontSize={["11", "10"][compactIndex]}
                  x="8"
                  y={y + 4}
                >
                  {value}%
                </SvgText>
              </G>
            );
          })}

          <Path d={buildAreaPath(points, chartBottomY)} fill="url(#chartFill)" />
          <Path
            d={createSmoothPath(points)}
            fill="none"
            stroke={theme.colors.primary}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={["4", "3.5"][compactIndex]}
          />

          {points.map((point) => (
            <Circle
              cx={point.x}
              cy={point.y}
              fill={theme.colors.primary}
              key={point.label}
              r={
                point.label === selectedPoint?.label
                  ? [6, 5][compactIndex]
                  : [5, 4][compactIndex]
              }
              stroke={theme.colors.surface}
              strokeWidth="3"
            />
          ))}

          {selectedPoint ? (
            <G
              x={selectedPoint.x - [34, 28][compactIndex]}
              y={selectedPoint.y - [76, 68][compactIndex]}
            >
              <Rect
                fill="rgba(21,24,27,0.98)"
                height={["52", "46"][compactIndex]}
                rx="10"
                stroke="rgba(255,255,255,0.08)"
                width={["68", "56"][compactIndex]}
                x="0"
                y="0"
              />
              <SvgText
                fill={theme.colors.text}
                fontSize={["16", "13"][compactIndex]}
                fontWeight="700"
                textAnchor="middle"
                x={["34", "28"][compactIndex]}
                y={["21", "18"][compactIndex]}
              >
                {selectedPoint.value}%
              </SvgText>
              <SvgText
                fill={theme.colors.textMuted}
                fontSize={["12", "10"][compactIndex]}
                textAnchor="middle"
                x={["34", "28"][compactIndex]}
                y={["38", "33"][compactIndex]}
              >
                {selectedPoint.label}
              </SvgText>
            </G>
          ) : null}

          {points.map((point) => (
            <SvgText
              fill={theme.colors.textMuted}
              fontSize={["11", "10"][compactIndex]}
              key={`label-${point.label}`}
              textAnchor="middle"
              x={point.x}
              y={svgHeight - 8}
            >
              {point.label}
            </SvgText>
          ))}
        </Svg>
      </View>
    </View>
  );
}

function AverageProgressPanel() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const isCompact = width <= 375;
  const compactIndex = Number(isCompact);
  const progress = 64;
  const radius = [54, 48][compactIndex];
  const strokeWidth = [12, 10][compactIndex];
  const panelDirection = ["row", "column"] as const;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const dashOffset = circumference - (progress / 100) * circumference;
  const metrics = [
    { color: theme.colors.primary, label: "Treino", value: 68, Icon: BriefcaseBusiness },
    { color: "#79C35A", label: "Nutrição", value: 61, Icon: Apple },
    { color: "#5BA1FF", label: "Avaliação", value: 63, Icon: BarChart3 },
  ];

  return (
    <View style={{ gap: [16, 12][compactIndex] }}>
      <SectionLabel title="Progresso médio dos alunos" />
      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: "rgba(255,255,255,0.06)",
          borderRadius: 24,
          borderWidth: 1,
          flexDirection: panelDirection[compactIndex],
          gap: [20, 14][compactIndex],
          paddingHorizontal: [20, 14][compactIndex],
          paddingVertical: [20, 14][compactIndex],
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Svg height={[120, 108][compactIndex]} width={[120, 108][compactIndex]}>
            <Defs>
              <LinearGradient id="ringGradient" x1="0" x2="1" y1="0" y2="1">
                <Stop offset="0%" stopColor="#FF9A3D" />
                <Stop offset="100%" stopColor="#D27A35" />
              </LinearGradient>
            </Defs>
            <G
              rotation="-90"
              origin={[`60,60`, `54,54`][compactIndex]}
            >
              <Circle
                cx={["60", "54"][compactIndex]}
                cy={["60", "54"][compactIndex]}
                fill="none"
                r={normalizedRadius}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={strokeWidth}
              />
              <Circle
                cx={["60", "54"][compactIndex]}
                cy={["60", "54"][compactIndex]}
                fill="none"
                r={normalizedRadius}
                stroke="url(#ringGradient)"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
              />
            </G>
          </Svg>
          <View
            style={{
              alignItems: "center",
              left: 0,
              position: "absolute",
              right: 0,
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontSize: [24, 22][compactIndex],
                fontWeight: "700",
              }}
            >
              {progress}%
            </Text>
            <Text style={{ color: theme.colors.textMuted, fontSize: [14, 12][compactIndex] }}>
              Média geral
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, gap: [18, 14][compactIndex], justifyContent: "center" }}>
          {metrics.map(({ color, label, value, Icon }) => (
            <View key={label} style={{ gap: 8 }}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 12,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: 16,
                    height: [32, 28][compactIndex],
                    justifyContent: "center",
                    width: [32, 28][compactIndex],
                  }}
                >
                  <Icon color={color} size={[16, 14][compactIndex]} />
                </View>
                <Text
                  style={{
                    color: theme.colors.text,
                    flex: 1,
                    fontSize: [15, 14][compactIndex],
                    fontWeight: "500",
                  }}
                >
                  {label}
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: [15, 14][compactIndex],
                    fontWeight: "600",
                  }}
                >
                  {value}%
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 999,
                  height: 7,
                  marginLeft: [44, 38][compactIndex],
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    backgroundColor: color,
                    borderRadius: 999,
                    height: "100%",
                    width: `${value}%`,
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

function PendingPaymentsBanner({ count }: { count: number }) {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const isCompact = width <= 375;
  const compactIndex = Number(isCompact);

  return (
    <View
      style={{
        backgroundColor: "#37251A",
        borderColor: "#734522",
        borderRadius: 22,
        borderWidth: 1,
        flexDirection: "row",
        gap: [16, 12][compactIndex],
        paddingHorizontal: [20, 14][compactIndex],
        paddingVertical: [18, 14][compactIndex],
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TriangleAlert color={theme.colors.primary} size={[28, 24][compactIndex]} />
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: [17, 15][compactIndex],
            fontWeight: "600",
          }}
        >
          {count} aluno{count > 1 ? "s" : ""} com pagamento pendente
        </Text>
        <Text style={{ color: "rgba(243,244,246,0.72)", fontSize: [15, 13][compactIndex] }}>
          Acesse para ver os detalhes
        </Text>
      </View>

      <View style={{ justifyContent: "center" }}>
        <ChevronRight color={theme.colors.primary} size={[24, 20][compactIndex]} />
      </View>
    </View>
  );
}

function FeaturedStudentItem({
  avatarUrl,
  goal,
  name,
  planDate,
  withDivider,
}: {
  avatarUrl: string;
  goal: string;
  name: string;
  planDate: string;
  withDivider: boolean;
}) {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const isCompact = width <= 375;
  const compactIndex = Number(isCompact);

  return (
    <View
      style={{
        borderBottomColor: withDivider ? "rgba(255,255,255,0.06)" : "transparent",
        borderBottomWidth: withDivider ? 1 : 0,
        paddingHorizontal: [18, 14][compactIndex],
        paddingVertical: [13, 11][compactIndex],
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: [12, 10][compactIndex],
        }}
      >
        <Image
          source={{ uri: avatarUrl }}
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            borderRadius: 22,
            borderWidth: 1,
            height: [44, 40][compactIndex],
            width: [44, 40][compactIndex],
          }}
        />

        <View style={{ flex: 1, gap: 2, minWidth: 0, paddingRight: [6, 4][compactIndex] }}>
          <Text
            numberOfLines={1}
            style={{
              color: theme.colors.text,
              fontSize: [15, 14][compactIndex],
              fontWeight: "600",
            }}
          >
            {name}
          </Text>
          <Text numberOfLines={1} style={{ color: theme.colors.textMuted, fontSize: [13.5, 12.5][compactIndex] }}>
            Objetivo: <Text style={{ color: theme.colors.primary }}>{goal}</Text>
          </Text>
        </View>

        <View
          style={{
            alignItems: "flex-end",
            gap: [8, 6][compactIndex],
            minWidth: [118, 104][compactIndex],
          }}
        >
          <View style={{ alignItems: "flex-end", gap: 2 }}>
            <Text style={{ color: theme.colors.textMuted, fontSize: [12.5, 11.5][compactIndex] }}>
              Plano atual
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: [13.5, 12.5][compactIndex] }}>
              {planDate}
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            style={{
              alignItems: "center",
              borderColor: theme.colors.primary,
              borderRadius: 999,
              borderWidth: 1,
              flexDirection: "row",
              gap: 6,
              paddingHorizontal: [12, 10][compactIndex],
              paddingVertical: [7, 6][compactIndex],
            }}
          >
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: [13.5, 12.5][compactIndex],
                fontWeight: "600",
              }}
            >
              Abrir planos
            </Text>
            <ChevronRight color={theme.colors.primary} size={[14, 13][compactIndex]} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export function TeacherDashboardScreen() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { currentUser } = useMockAuth();
  const { getTeacherExpectedRevenue, subscriptions } = usePayments();
  const isCompact = width <= 375;
  const compactIndex = Number(isCompact);
  const teacher = currentUser();
  const coachName = teacher?.name.split(" ")[0] ?? "Coach";
  const pendingPayments = Math.max(
    2,
    subscriptions.filter((subscription) => subscription.status === "gracePeriod").length
  );
  const monthlyRevenue = Math.max(
    8240,
    teacher ? Math.round(getTeacherExpectedRevenue(teacher.id)) : 8240
  );

  return (
    <Screen>
      <View style={{ gap: [22, 18][compactIndex] }}>
        <View
          style={{
            alignItems: "flex-start",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: [16, 10][compactIndex],
          }}
        >
          <View
            style={{
              flex: 1,
              gap: 12,
            }}
          >
            <Pressable
              accessibilityLabel="Abrir menu"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{
                alignItems: "center",
                alignSelf: "flex-start",
                backgroundColor: theme.colors.surfaceAlt,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                flexDirection: "row",
                gap: theme.spacing.xs,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: 6,
              }}
            >
              <Menu color={theme.colors.primary} size={18} />
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.typography.caption,
                  fontWeight: "700",
                }}
              >
                Menu
              </Text>
            </Pressable>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: [14, 10][compactIndex],
              }}
            >
              <Image
                source={brandSymbol}
                style={{
                  height: [62, 50][compactIndex],
                  width: [62, 50][compactIndex],
                }}
              />
              <View style={{ flex: 1, gap: 2 }}>
              <Text
                style={{
                  color: "rgba(243,244,246,0.75)",
                  fontSize: [17, 15][compactIndex],
                  fontWeight: "400",
                }}
              >
                Olá, {coachName}!
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: [27, 22][compactIndex],
                  fontWeight: "700",
                  letterSpacing: -0.8,
                }}
              >
                Dashboard do coach
              </Text>
              </View>
            </View>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row", gap: [16, 10][compactIndex] }}>
            <View
              style={{
                alignItems: "center",
                height: [46, 40][compactIndex],
                justifyContent: "center",
                width: [34, 30][compactIndex],
              }}
            >
              <Bell color="rgba(243,244,246,0.82)" size={[28, 22][compactIndex]} />
              <View
                style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 999,
                height: 7,
                position: "absolute",
                right: [4, 3][compactIndex],
                top: [7, 6][compactIndex],
                width: 7,
              }}
            />
            </View>

            <Image
              source={{
                uri:
                  teacher?.avatarUrl ??
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
              }}
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                borderRadius: 28,
                borderWidth: 1,
                height: [56, 48][compactIndex],
                width: [56, 48][compactIndex],
              }}
            />
          </View>
        </View>

        <SectionLabel title="Visão geral" />

        <View style={{ flexDirection: "row", gap: [10, 8][compactIndex] }}>
          <OverviewCard
            icon={<Users color={theme.colors.primary} size={16} />}
            label="Alunos ativos"
            trend="▲ 12%"
            value="28"
          />
          <OverviewCard
            icon={<BriefcaseBusiness color={theme.colors.primary} size={16} />}
            label={"Planos em andamento"}
            trend="▲ 8%"
            value="32"
          />
          <OverviewCard
            icon={<Wallet color={theme.colors.primary} size={16} />}
            label={"Pagamentos do mês"}
            trend="▲ 15%"
            value={formatCurrency(monthlyRevenue)}
          />
        </View>

        <WeeklyEngagementChart />

        <AverageProgressPanel />

        <PendingPaymentsBanner count={pendingPayments} />

        <SectionLabel action="Ver todos" title="Alunos em destaque" />

        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: "rgba(255,255,255,0.06)",
            borderRadius: 24,
            borderWidth: 1,
            overflow: "hidden",
          }}
        >
          {highlightedStudents.map((student, index) => (
            <FeaturedStudentItem
              avatarUrl={student.avatarUrl}
              goal={student.goal}
              key={student.id}
              name={student.name}
              planDate={student.planDate}
              withDivider={index < highlightedStudents.length - 1}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}
