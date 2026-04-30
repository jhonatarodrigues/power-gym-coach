import { Pressable, Text, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppTheme } from "@/theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export function Header({
  title,
  subtitle,
  showBackButton = true,
}: HeaderProps) {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const shouldRenderBack = showBackButton && navigation.canGoBack();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      {shouldRenderBack ? (
        <Pressable
          accessibilityLabel="Voltar"
          onPress={() => navigation.goBack()}
          style={{
            alignItems: "center",
            alignSelf: "flex-start",
            flexDirection: "row",
            gap: theme.spacing.xs,
          }}
        >
          <ChevronLeft color={theme.colors.primary} size={18} />
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.typography.caption,
              fontWeight: "700",
            }}
          >
            Voltar
          </Text>
        </Pressable>
      ) : null}

      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.title,
          fontWeight: "800",
        }}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: theme.typography.body,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
