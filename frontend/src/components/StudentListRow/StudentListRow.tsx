import { Image, Text, View } from "react-native";

import { Button } from "@/components";
import { useAppTheme } from "@/theme";

interface StudentListRowProps {
  actionLabel?: string;
  name: string;
  objective: string;
  onActionPress?: () => void;
  planDate?: string;
  planLabel?: string;
  photoUrl: string;
}

export function StudentListRow({
  actionLabel,
  name,
  objective,
  onActionPress,
  planDate,
  planLabel = "Plano atual",
  photoUrl,
}: StudentListRowProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        alignItems: "center",
        borderBottomColor: "rgba(255,255,255,0.06)",
        borderBottomWidth: 1,
        flexDirection: "row",
        gap: 12,
        paddingVertical: 12,
      }}
    >
      <Image
        source={{ uri: photoUrl }}
        style={{ borderRadius: theme.radius.pill, height: 46, width: 46 }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: theme.colors.text,
            fontSize: 14.5,
            fontWeight: "600",
          }}
        >
          {name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: theme.colors.textMuted,
            fontSize: 12.5,
          }}
        >
          Objetivo: <Text style={{ color: theme.colors.primary }}>{objective}</Text>
        </Text>
      </View>
      {planDate ? (
        <View style={{ minWidth: 78 }}>
          <Text style={{ color: theme.colors.textMuted, fontSize: 11.5 }}>{planLabel}</Text>
          <Text style={{ color: theme.colors.text, fontSize: 12 }}>{planDate}</Text>
        </View>
      ) : null}
      {actionLabel ? (
        <Button fullWidth={false} label={actionLabel} onPress={onActionPress} size="sm" />
      ) : null}
    </View>
  );
}
