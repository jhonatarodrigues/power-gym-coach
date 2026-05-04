import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "@/theme";

interface ScreenProps extends PropsWithChildren {
  scrollable?: boolean;
}

export function Screen({ children, scrollable = true }: ScreenProps) {
  const { theme } = useAppTheme();

  const content = (
    <View
      style={[
        styles.content,
        {
          backgroundColor: theme.colors.background,
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.xxl,
          gap: theme.spacing.xl,
        },
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      {scrollable ? (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.scrollContent}
          contentInsetAdjustmentBehavior="never"
          style={{ backgroundColor: theme.colors.background }}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
