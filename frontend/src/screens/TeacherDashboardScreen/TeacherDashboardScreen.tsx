import { useMemo, type ReactNode } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import {
  Apple,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react-native";

import { Button, Card, Screen, SectionTitle } from "@/components";
import {
  assessmentReviewsMock,
  examRequestsMock,
  studentProfilesMock,
} from "@/repository/mock";
import { useMockAuth } from "@/hooks/useMockAuth";
import { usePayments } from "@/hooks/usePayments";
import { useAppTheme } from "@/theme";
import { currentPlanMock } from "@/repository/mock";
const weeklyEngagement = [
  { label: "Seg", value: 34 },
  { label: "Ter", value: 51 },
  { label: "Qua", value: 38 },
  { label: "Qui", value: 75 },
  { label: "Sex", value: 56 },
  { label: "Sab", value: 72 },
  { label: "Dom", value: 51 },
];

function WeeklyChart() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const chartWidth = Math.min(width - 92, 720);
  const chartHeight = 230;
  const paddingX = 34;
  const paddingTop = 22;
  const paddingBottom = 28;
  const drawableWidth = chartWidth - paddingX * 2;
  const drawableHeight = chartHeight - paddingTop - paddingBottom;
  const stepX = drawableWidth / Math.max(weeklyEngagement.length - 1, 1);
  const maxValue = 100;
  const points = weeklyEngagement.map((item, index) => ({
    x: paddingX + stepX * index,
    y: paddingTop + drawableHeight - (item.value / maxValue) * drawableHeight,
    ...item,
  }));
  const selectedPoint = points[3];
  const yTicks = [0, 25, 50, 75, 100];

  return (
    <Card>
      <View style={{ gap: theme.spacing.lg }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: theme.spacing.xs }}>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.subtitle,
                fontWeight: "700",
              }}
            >
              Engajamento semanal
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "flex-start",
              backgroundColor: theme.colors.surfaceAlt,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.pill,
              borderWidth: 1,
              flexDirection: "row",
              gap: theme.spacing.xs,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            }}
          >
            <Text style={{ color: theme.colors.text, fontWeight: "600" }}>
              Ultimos 7 dias
            </Text>
            <ChevronDown color={theme.colors.textMuted} size={16} />
          </View>
        </View>

        <View
          style={{
            borderRadius: theme.radius.md,
            height: chartHeight,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {yTicks.map((tick) => {
            const y = paddingTop + drawableHeight - (tick / maxValue) * drawableHeight;

            return (
              <View
                key={tick}
                style={{
                  borderStyle: "dashed",
                  borderTopColor: theme.colors.border,
                  borderTopWidth: 1,
                  left: paddingX,
                  position: "absolute",
                  right: paddingX,
                  top: y,
                }}
              />
            );
          })}

          {points.slice(0, -1).map((point, index) => {
            const next = points[index + 1];

            if (!next) {
              return null;
            }

            const deltaX = next.x - point.x;
            const deltaY = next.y - point.y;
            const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

            return (
              <View
                key={`${point.label}-${next.label}`}
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.pill,
                  height: 4,
                  left: point.x,
                  position: "absolute",
                  top: point.y,
                  transform: [{ translateY: -2 }, { rotate: `${angle}deg` }],
                  width: length,
                }}
              />
            );
          })}

          {points.map((point) => (
            <View
              key={point.label}
              style={{
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.surface,
                borderRadius: theme.radius.pill,
                borderWidth: 3,
                height: point.label === selectedPoint?.label ? 14 : 12,
                left: point.x - (point.label === selectedPoint?.label ? 7 : 6),
                position: "absolute",
                top: point.y - (point.label === selectedPoint?.label ? 7 : 6),
                width: point.label === selectedPoint?.label ? 14 : 12,
              }}
            />
          ))}

          {selectedPoint ? (
            <View
              style={{
                alignItems: "center",
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.md,
                borderWidth: 1,
                left: selectedPoint.x - 38,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                position: "absolute",
                top: 10,
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: theme.typography.subtitle,
                  fontWeight: "800",
                }}
              >
                {selectedPoint.value}%
              </Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.caption }}>
                {selectedPoint.label}
              </Text>
            </View>
          ) : null}

          <View
            style={{
              bottom: 18,
              left: 0,
              position: "absolute",
              right: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: paddingX - 2,
              }}
            >
              {weeklyEngagement.map((item) => (
                <Text
                  key={item.label}
                  style={{
                    color: theme.colors.textMuted,
                    fontSize: theme.typography.caption,
                  }}
                >
                  {item.label}
                </Text>
              ))}
            </View>
          </View>

          <View
            style={{
              left: 0,
              paddingTop: paddingTop - 10,
              position: "absolute",
              top: 0,
            }}
          >
            {yTicks
              .slice()
              .reverse()
              .map((tick) => (
                <Text
                  key={tick}
                  style={{
                    color: theme.colors.textMuted,
                    fontSize: 11,
                    marginBottom:
                      tick === 0
                        ? 0
                        : drawableHeight / (yTicks.length - 1) - 14,
                  }}
                >
                  {tick}%
                </Text>
              ))}
          </View>
        </View>
      </View>
    </Card>
  );
}

function AverageProgressCard() {
  const { theme } = useAppTheme();
  const metrics = [
    { label: "Treino", value: 68, color: theme.colors.primary, Icon: BriefcaseBusiness },
    { label: "Nutricao", value: 61, color: "#79C35A", Icon: Apple },
    { label: "Avaliacao", value: 63, color: "#5BA1FF", Icon: Bell },
  ];

  return (
    <Card>
      <View style={{ gap: theme.spacing.lg }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.subtitle,
            fontWeight: "700",
          }}
        >
          Progresso medio dos alunos
        </Text>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: theme.spacing.xl,
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.surfaceAlt,
              borderColor: theme.colors.border,
              borderRadius: 72,
              borderWidth: 10,
              height: 138,
              justifyContent: "center",
              position: "relative",
              width: 138,
            }}
          >
            <View
              style={{
                borderColor: theme.colors.primary,
                borderRadius: 72,
                borderRightColor: "#C48A54",
                borderTopColor: theme.colors.primary,
                borderWidth: 10,
                height: 138,
                left: -10,
                opacity: 0.95,
                position: "absolute",
                top: -10,
                width: 138,
              }}
            />
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 26,
                  fontWeight: "800",
                }}
              >
                64%
              </Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.caption }}>
                Media geral
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, gap: theme.spacing.md }}>
            {metrics.map(({ label, value, color, Icon }) => (
              <View key={label} style={{ gap: theme.spacing.xs }}>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: theme.spacing.sm,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: theme.colors.surfaceAlt,
                      borderRadius: theme.radius.pill,
                      height: 28,
                      justifyContent: "center",
                      width: 28,
                    }}
                  >
                    <Icon color={color} size={14} />
                  </View>
                  <Text style={{ color: theme.colors.text, flex: 1, fontWeight: "600" }}>
                    {label}
                  </Text>
                  <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{value}%</Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.surfaceAlt,
                    borderRadius: theme.radius.pill,
                    height: 8,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: color,
                      borderRadius: theme.radius.pill,
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
    </Card>
  );
}

function StatCard({
  label,
  value,
  trend,
  icon,
}: {
  label: string;
  value: string;
  trend: string;
  icon: ReactNode;
}) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        flex: 1,
        gap: theme.spacing.lg,
        minWidth: 0,
        padding: theme.spacing.lg,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: theme.spacing.md,
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.surfaceAlt,
            borderRadius: theme.radius.pill,
            height: 42,
            justifyContent: "center",
            width: 42,
          }}
        >
          {icon}
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 22,
              fontWeight: "800",
            }}
          >
            {value}
          </Text>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontSize: theme.typography.body,
              lineHeight: 22,
            }}
          >
            {label}
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: "#4FD18B",
          fontSize: theme.typography.body,
          fontWeight: "700",
        }}
      >
        {trend}
      </Text>
    </View>
  );
}

function FeaturedStudentRow({
  name,
  goal,
  planDate,
  withDivider = false,
}: {
  name: string;
  goal: string;
  planDate: string;
  withDivider?: boolean;
}) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        borderBottomColor: withDivider ? theme.colors.border : "transparent",
        borderBottomWidth: withDivider ? 1 : 0,
        paddingBottom: withDivider ? theme.spacing.md : 0,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: theme.spacing.md,
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.surfaceAlt,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            height: 48,
            justifyContent: "center",
            width: 48,
          }}
        >
          <Text style={{ color: theme.colors.text, fontWeight: "800" }}>{name.slice(0, 1)}</Text>
        </View>

        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.body, fontWeight: "700" }}>
            {name}
          </Text>
          <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.caption }}>
            Objetivo: <Text style={{ color: theme.colors.primary }}>{goal}</Text>
          </Text>
        </View>

        <View style={{ alignItems: "flex-end", gap: 2 }}>
          <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.caption }}>
            Plano atual
          </Text>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.caption }}>
            {planDate}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function TeacherDashboardScreen() {
  const { theme } = useAppTheme();
  const { currentUser, studentInvitations } = useMockAuth();
  const { getTeacherExpectedRevenue, subscriptions, paymentRecords } = usePayments();
  const teacher = currentUser();

  const activeStudents = studentProfilesMock.length;
  const pendingExamRequests = examRequestsMock.filter(
    (request) => request.status === "pending"
  ).length;
  const reviewedAssessments = assessmentReviewsMock.length;
  const studentsInGracePeriod = subscriptions.filter(
    (subscription) => subscription.status === "gracePeriod"
  ).length;
  const activePlans = studentProfilesMock.filter(
    (student) => student.userId === currentPlanMock.studentId
  ).length;
  const monthlyRevenue = teacher ? getTeacherExpectedRevenue(teacher.id) : 0;
  const firstInvitation = studentInvitations.find(
    (invitation) => invitation.status === "pending"
  );

  const highlightedStudents = useMemo(
    () => [
      { name: "Juliana Mendes", goal: "Definicao", planDate: "23/04/2026" },
      { name: "Rafael Souza", goal: "Hipertrofia", planDate: "18/04/2026" },
      { name: "Carla Oliveira", goal: "Emagrecimento", planDate: "10/04/2026" },
    ],
    []
  );

  return (
    <Screen>
      <View style={{ gap: theme.spacing.lg }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: theme.spacing.md,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
              gap: theme.spacing.md,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                height: 52,
                justifyContent: "center",
                width: 52,
              }}
            >
              <Text style={{ color: theme.colors.primary, fontSize: 28, fontWeight: "800" }}>
                P
              </Text>
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.body }}>
                Ola, Coach!
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 28,
                  fontWeight: "800",
                  letterSpacing: -0.6,
                }}
              >
                Dashboard do coach
              </Text>
            </View>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.md }}>
            <View
              style={{
                height: 42,
                justifyContent: "center",
                width: 42,
              }}
            >
              <Bell color={theme.colors.textMuted} size={24} />
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.pill,
                  height: 8,
                  position: "absolute",
                  right: 5,
                  top: 5,
                  width: 8,
                }}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: theme.colors.surfaceAlt,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                height: 48,
                justifyContent: "center",
                width: 48,
              }}
            >
              <Text style={{ color: theme.colors.text, fontWeight: "800" }}>
                {teacher?.name.slice(0, 1) ?? "C"}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ color: theme.colors.text, fontSize: theme.typography.subtitle }}>
          Visao geral
        </Text>

        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
          <StatCard
            icon={<Users color={theme.colors.primary} size={20} />}
            label="Alunos ativos"
            trend="▲ 12% vs mes anterior"
            value={String(activeStudents)}
          />
          <StatCard
            icon={<BriefcaseBusiness color={theme.colors.primary} size={20} />}
            label="Planos em andamento"
            trend="▲ 8% vs mes anterior"
            value={String(activePlans)}
          />
          <StatCard
            icon={<Wallet color={theme.colors.primary} size={20} />}
            label="Pagamentos do mes"
            trend="▲ 15% vs mes anterior"
            value={`R$ ${monthlyRevenue.toFixed(0)}`}
          />
        </View>

        <WeeklyChart />

        <AverageProgressCard />

        <Card>
          <View
            style={{
              alignItems: "center",
              backgroundColor: `${theme.colors.primary}14`,
              borderColor: `${theme.colors.primary}33`,
              borderRadius: theme.radius.md,
              borderWidth: 1,
              flexDirection: "row",
              gap: theme.spacing.md,
              justifyContent: "space-between",
              padding: theme.spacing.lg,
            }}
          >
            <View style={{ alignItems: "center", flex: 1, flexDirection: "row", gap: theme.spacing.md }}>
              <TriangleAlert color={theme.colors.primary} size={24} />
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={{ color: theme.colors.text, fontSize: theme.typography.subtitle, fontWeight: "700" }}>
                  {studentsInGracePeriod} aluno(s) com pagamento pendente
                </Text>
                <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.body }}>
                  Acesse para ver os detalhes
                </Text>
              </View>
            </View>
            <ChevronRight color={theme.colors.primary} size={22} />
          </View>
        </Card>

        <SectionTitle
          actionLabel="Ver todos"
          description="Selecione o aluno para abrir planos, dieta, treino e feedback."
          title="Alunos em destaque"
        />

        <Card>
          <View style={{ gap: theme.spacing.md }}>
            {highlightedStudents.map((student, index) => (
              <View key={student.name} style={{ gap: theme.spacing.md }}>
                <FeaturedStudentRow
                  goal={student.goal}
                  name={student.name}
                  planDate={student.planDate}
                  withDivider={index < highlightedStudents.length - 1}
                />
                <View style={{ alignSelf: "flex-end" }}>
                  <Button
                    fullWidth={false}
                    label="Abrir planos"
                    onPress={() => {}}
                    rightIcon={<ChevronRight color={theme.colors.primary} size={14} />}
                    size="sm"
                    variant="soft"
                  />
                </View>
              </View>
            ))}
          </View>
        </Card>

        {firstInvitation ? (
          <Card>
            <View style={{ gap: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                Link de primeiro acesso gerado
              </Text>
              <Text style={{ color: theme.colors.textMuted }}>{firstInvitation.studentEmail}</Text>
              <Text style={{ color: theme.colors.primary }}>{firstInvitation.firstAccessLink}</Text>
            </View>
          </Card>
        ) : null}
      </View>
    </Screen>
  );
}
