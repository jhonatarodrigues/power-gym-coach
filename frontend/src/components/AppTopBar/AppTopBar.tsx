import { Image, Pressable, Text, View } from "react-native";
import { Bell, ChevronLeft, Ellipsis, Menu } from "lucide-react-native";

import { useAppTheme } from "@/theme";

const brandSymbol = require("../../../assets/brand-symbol.png");

interface AppTopBarProps {
  title: string;
  subtitle?: string;
  onAvatarPress?: () => void;
  onBackPress?: () => void;
  onContextPress?: () => void;
  onMenuPress?: () => void;
  avatarUrl?: string;
  showAvatar?: boolean;
  showBell?: boolean;
  showBrandSymbol?: boolean;
  showContextMenu?: boolean;
  showMenu?: boolean;
  showBack?: boolean;
}

export function AppTopBar({
  title,
  subtitle,
  onAvatarPress,
  onBackPress,
  onContextPress,
  onMenuPress,
  avatarUrl,
  showAvatar = true,
  showBell = true,
  showBrandSymbol = false,
  showContextMenu = false,
  showMenu = false,
  showBack = false,
}: AppTopBarProps) {
  const { theme } = useAppTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flexShrink: 1,
            gap: theme.spacing.sm,
          }}
        >
          {showMenu ? (
            <Pressable accessibilityLabel="Abrir menu" onPress={onMenuPress}>
              <Menu color={theme.colors.text} size={20} strokeWidth={2.1} />
            </Pressable>
          ) : null}

          {showBack ? (
            <Pressable accessibilityLabel="Voltar" onPress={onBackPress}>
              <ChevronLeft color={theme.colors.text} size={22} strokeWidth={2.1} />
            </Pressable>
          ) : null}

          {showBrandSymbol ? (
            <Image
              source={brandSymbol}
              style={{ height: 36, resizeMode: "contain", width: 36 }}
            />
          ) : null}

          <View style={{ flexShrink: 1, gap: 2 }}>
            {subtitle ? (
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontSize: theme.typography.caption + 1,
                }}
              >
                {subtitle}
              </Text>
            ) : null}
            <Text
              numberOfLines={1}
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.subtitle + 6,
                fontWeight: "700",
                letterSpacing: -0.6,
              }}
            >
              {title}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.md }}>
          {showBell ? (
            <View>
              <Bell color={theme.colors.textMuted} size={20} strokeWidth={2.1} />
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.pill,
                  height: 8,
                  position: "absolute",
                  right: -1,
                  top: -1,
                  width: 8,
                }}
              />
            </View>
          ) : null}

          {showContextMenu ? (
            <Pressable
              accessibilityLabel="Abrir ações"
              onPress={onContextPress}
              style={{
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.06)",
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                height: 34,
                justifyContent: "center",
                width: 34,
              }}
            >
              <Ellipsis color={theme.colors.textMuted} size={18} />
            </Pressable>
          ) : null}

          {showAvatar ? (
            <Pressable
              accessibilityLabel="Abrir perfil"
              onPress={onAvatarPress}
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                borderRadius: theme.radius.pill,
                borderWidth: 1,
                overflow: "hidden",
              }}
            >
              <Image
                source={
                  avatarUrl
                    ? { uri: avatarUrl }
                    : require("../../../assets/brand-symbol.png")
                }
                style={{
                  backgroundColor: theme.colors.surfaceAlt,
                  height: 42,
                  width: 42,
                }}
              />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}
