import { Text, View } from "react-native";

import { Card, Header, HistoryCard, MetricCard, Screen, SectionTitle } from "@/components";
import { progressEntriesMock } from "@/repository/mock";
import { useAppTheme } from "@/theme";

export function ProgressScreen() {
  const { theme } = useAppTheme();
  const latestEntry = progressEntriesMock.at(-1);
  const firstEntry = progressEntriesMock[0];
  const weightDelta =
    latestEntry?.weightKg && firstEntry?.weightKg
      ? (latestEntry.weightKg - firstEntry.weightKg).toFixed(1)
      : "0.0";
  const bodyFatDelta =
    latestEntry?.bodyFatPercentage && firstEntry?.bodyFatPercentage
      ? (latestEntry.bodyFatPercentage - firstEntry.bodyFatPercentage).toFixed(1)
      : "0.0";

  return (
    <Screen>
      <Header
        title="Progress"
        subtitle="Resumo mockado da evolucao recente do aluno antes da versao completa com graficos."
      />

      <MetricCard
        label="peso atual"
        value={latestEntry?.weightKg ? `${latestEntry.weightKg} kg` : "--"}
        trend={`${weightDelta} kg desde o inicio do acompanhamento`}
      />

      <View style={{ gap: theme.spacing.md }}>
        <MetricCard
          label="BF atual"
          value={
            latestEntry?.bodyFatPercentage
              ? `${latestEntry.bodyFatPercentage}%`
              : "--"
          }
          trend={`${bodyFatDelta}% desde a primeira medicao`}
        />
      </View>

      {latestEntry ? (
        <>
          <SectionTitle
            title="Ultima leitura"
            description="Base do futuro painel de progresso visual."
          />
          <Card>
            <View style={{ gap: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.text }}>
                Data: {latestEntry.date}
              </Text>
              <Text style={{ color: theme.colors.textMuted }}>
                {latestEntry.notes}
              </Text>
              <Text style={{ color: theme.colors.textMuted }}>
                Fotos registradas: {latestEntry.photos.length}
              </Text>
            </View>
          </Card>
        </>
      ) : null}

      <SectionTitle
        title="Timeline"
        description="Entradas mockadas de progresso registradas ate agora."
      />
      <View style={{ gap: theme.spacing.md }}>
        {progressEntriesMock.map((entry) => (
          <HistoryCard
            key={entry.id}
            record={{
              id: entry.id,
              studentId: entry.studentId,
              type: "progress",
              title: `${entry.weightKg} kg / ${entry.bodyFatPercentage}% BF`,
              description: entry.notes,
              date: entry.date,
            }}
          />
        ))}
      </View>
    </Screen>
  );
}
