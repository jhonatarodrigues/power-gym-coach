import type { PropsWithChildren, ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "@/theme";

interface AppChromeProps extends PropsWithChildren {
  footer?: ReactNode;
  scrollable?: boolean;
}

export function AppChrome({
  children,
  footer,
  scrollable = true,
}: AppChromeProps) {
  const { theme } = useAppTheme();
  const contentPaddingBottom = footer
    ? theme.spacing.xl + theme.spacing.xxl + 72
    : theme.spacing.xxl;

  const content = (
    <View
      style={{
        gap: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.xs,
        paddingBottom: contentPaddingBottom,
      }}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
    >
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        {scrollable ? (
          <ScrollView
            alwaysBounceVertical={false}
            automaticallyAdjustContentInsets={false}
            contentInsetAdjustmentBehavior="never"
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >
            {content}
          </ScrollView>
        ) : (
          <View style={{ flex: 1 }}>{content}</View>
        )}

        {footer ? (
          <View
            style={{
              backgroundColor: theme.colors.background,
              borderTopColor: "rgba(255,255,255,0.06)",
              borderTopWidth: 1,
              bottom: 0,
              left: 0,
              paddingBottom: theme.spacing.sm,
              paddingHorizontal: theme.spacing.md,
              paddingTop: theme.spacing.xs,
              position: "absolute",
              right: 0,
            }}
          >
            {footer}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
