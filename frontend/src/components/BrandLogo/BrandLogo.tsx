import { Image, Text, View } from "react-native";

import { useAppTheme } from "@/theme";

const brandIcon = require("../../../assets/brand-symbol.png");

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  subtitle?: string;
}

const sizeMap = {
  sm: 28,
  md: 40,
  lg: 72,
} as const;

export function BrandLogo({
  size = "md",
  showWordmark = true,
  subtitle,
}: BrandLogoProps) {
  const { theme } = useAppTheme();
  const iconSize = sizeMap[size];

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
      }}
    >
      <Image
        source={brandIcon}
        style={{
          borderRadius: size === "lg" ? theme.radius.lg : theme.radius.md,
          height: iconSize,
          width: iconSize,
        }}
      />
      {showWordmark ? (
        <View style={{ gap: theme.spacing.xs }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: size === "lg" ? theme.typography.title : theme.typography.subtitle,
              fontWeight: "800",
            }}
          >
            Power Gym Coach
          </Text>
          {subtitle ? (
            <Text
              style={{
                color: theme.colors.textMuted,
                fontSize: theme.typography.caption,
              }}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
