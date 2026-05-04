import { Pressable, Text, View } from "react-native";
import { ChevronLeft, Menu } from "lucide-react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";

import { BrandLogo } from "@/components/BrandLogo";
import { useAppTheme } from "@/theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showBrand?: boolean;
}

export function Header({
  title,
  subtitle,
  showBackButton = true,
  showBrand = false,
}: HeaderProps) {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const shouldRenderBack = showBackButton && navigation.canGoBack();
  const shouldRenderMenu = !shouldRenderBack;

  return (
    <View style={{ gap: theme.spacing.md }}>
      {shouldRenderBack || shouldRenderMenu ? (
        <Pressable
          accessibilityLabel={shouldRenderBack ? "Voltar" : "Abrir menu"}
          onPress={() => {
            if (shouldRenderBack) {
              navigation.goBack();
              return;
            }

            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
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
          {shouldRenderBack ? (
            <ChevronLeft color={theme.colors.primary} size={18} />
          ) : (
            <Menu color={theme.colors.primary} size={18} />
          )}
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.typography.caption,
              fontWeight: "700",
            }}
          >
            {shouldRenderBack ? "Voltar" : "Menu"}
          </Text>
        </Pressable>
      ) : null}

      {showBrand ? (
        <BrandLogo
          showWordmark={false}
          size="md"
        />
      ) : (
        <View style={{ gap: theme.spacing.xs }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.title,
              fontWeight: "800",
              lineHeight: 32,
            }}
          >
            {title}
          </Text>
        </View>
      )}

      {subtitle ? (
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: theme.typography.body,
            lineHeight: 22,
            maxWidth: 560,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
