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
    <View style={{ gap: theme.spacing.sm }}>
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
            flexDirection: "row",
            gap: theme.spacing.xs,
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
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.title,
            fontWeight: "800",
          }}
        >
          {title}
        </Text>
      )}

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
