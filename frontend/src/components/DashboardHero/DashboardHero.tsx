import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface DashboardHeroStat {
  label: string;
  value: string;
}

interface DashboardHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  accentLabel?: string;
  stats: DashboardHeroStat[];
}

export function DashboardHero({
  eyebrow,
  title,
  subtitle,
  accentLabel,
  stats,
}: DashboardHeroProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surfaceAlt,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        gap: theme.spacing.lg,
        overflow: "hidden",
        padding: theme.spacing.xl,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.primary,
          borderRadius: theme.radius.pill,
          height: 180,
          opacity: 0.09,
          position: "absolute",
          right: -48,
          top: -56,
          width: 180,
        }}
      />

      <View style={{ gap: theme.spacing.sm }}>
        {eyebrow ? (
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.typography.caption,
              fontWeight: "800",
              letterSpacing: 0.6,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </Text>
        ) : null}
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 30,
            fontWeight: "800",
            lineHeight: 34,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: theme.typography.body,
            lineHeight: 22,
            maxWidth: 420,
          }}
        >
          {subtitle}
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.spacing.sm,
        }}
      >
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.md,
              borderWidth: 1,
              gap: theme.spacing.xs,
              minWidth: 128,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            }}
          >
            <Text
              style={{
                color: theme.colors.textMuted,
                fontSize: theme.typography.caption,
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 22,
                fontWeight: "800",
              }}
            >
              {stat.value}
            </Text>
          </View>
        ))}
      </View>

      {accentLabel ? (
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: theme.colors.primaryMuted,
            borderRadius: theme.radius.pill,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.typography.caption,
              fontWeight: "700",
            }}
          >
            {accentLabel}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
