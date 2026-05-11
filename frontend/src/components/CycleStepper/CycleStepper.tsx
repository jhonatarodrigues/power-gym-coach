import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

interface CycleStep {
  key: string;
  label: string;
  tone: "done" | "active" | "upcoming";
  value?: string;
}

interface CycleStepperProps {
  title: string;
  statusText?: string;
  steps: CycleStep[];
}

export function CycleStepper({
  title,
  statusText,
  steps,
}: CycleStepperProps) {
  const { theme } = useAppTheme();

  function getStepColor(tone: CycleStep["tone"]) {
    if (tone === "done") {
      return theme.colors.success;
    }

    if (tone === "active") {
      return theme.colors.primary;
    }

    return "rgba(255,255,255,0.14)";
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 20,
        borderWidth: 1,
        gap: 18,
        padding: 16,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "600" }}>{title}</Text>
        {statusText ? (
          <Text style={{ color: theme.colors.success, fontSize: 12.5, fontWeight: "600" }}>
            {statusText}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {steps.map((step, index) => (
          <View key={step.key} style={{ alignItems: "center", flex: 1 }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
            >
              {index > 0 ? (
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    flex: 1,
                    height: 2,
                    marginRight: 6,
                  }}
                />
              ) : (
                <View style={{ flex: 1 }} />
              )}
              <View
                style={{
                  backgroundColor: getStepColor(step.tone),
                  borderRadius: 999,
                  height: 12,
                  width: 12,
                }}
              />
              {index < steps.length - 1 ? (
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    flex: 1,
                    height: 2,
                    marginLeft: 6,
                  }}
                />
              ) : (
                <View style={{ flex: 1 }} />
              )}
            </View>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 11.5,
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {step.label}
            </Text>
            {step.value ? (
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontSize: 10.5,
                  marginTop: 2,
                  textAlign: "center",
                }}
              >
                {step.value}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}
