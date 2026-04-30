import { Text, View } from "react-native";

import {
  Card,
  ComparisonCard,
  DecisionCard,
  Header,
  HistoryCard,
  MetricCard,
  PendingAlertCard,
  Screen,
  SectionTitle,
} from "@/components";
import { useProgressSummary } from "@/hooks/useProgressSummary";
import { useAppTheme } from "@/theme";

export function ProgressScreen() {
  const { theme } = useAppTheme();
  const {
    bodyFatDelta,
    bodyFatDirection,
    entries,
    latestEntry,
    latestPhotos,
    previousBodyFatDelta,
    previousEntry,
    previousWeightDelta,
    recentMomentum,
    weightDelta,
    weightDirection,
  } = useProgressSummary();

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

      <View style={{ gap: theme.spacing.md }}>
        <DecisionCard
          badgeLabel="Momentum"
          description={recentMomentum}
          highlight={`Ultima leitura em ${latestEntry?.date ?? "--"}`}
          title="Direcao atual do progresso"
        />
        <PendingAlertCard
          count={latestPhotos.length}
          description="Fotos comparativas disponiveis para leitura visual da evolucao."
          title="Galeria da ultima leitura"
        />
      </View>

      <SectionTitle
        title="Comparativo por periodo"
        description="Leitura rapida entre a ultima entrada e a medicao anterior."
      />
      <View style={{ gap: theme.spacing.md }}>
        <ComparisonCard
          currentValue={latestEntry?.weightKg ? `${latestEntry.weightKg} kg` : "--"}
          deltaLabel={`${previousWeightDelta} kg em relacao a leitura anterior`}
          previousValue={previousEntry?.weightKg ? `${previousEntry.weightKg} kg` : "--"}
          title="Peso corporal"
          tone={Number(previousWeightDelta) <= 0 ? "success" : "info"}
          trendLabel={weightDirection}
        />
        <ComparisonCard
          currentValue={
            latestEntry?.bodyFatPercentage ? `${latestEntry.bodyFatPercentage}%` : "--"
          }
          deltaLabel={`${previousBodyFatDelta}% em relacao a leitura anterior`}
          previousValue={
            previousEntry?.bodyFatPercentage
              ? `${previousEntry.bodyFatPercentage}%`
              : "--"
          }
          title="Gordura corporal"
          tone={Number(previousBodyFatDelta) <= 0 ? "success" : "warning"}
          trendLabel={bodyFatDirection}
        />
      </View>

      <View style={{ gap: theme.spacing.md }}>
        <MetricCard
          label="variacao de peso"
          value={`${weightDelta} kg`}
          trend="comparado com a primeira leitura"
        />
        <MetricCard
          label="variacao de BF"
          value={`${bodyFatDelta}%`}
          trend="comparado com a primeira leitura"
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
                Fotos registradas: {latestPhotos.length}
              </Text>
              <View style={{ gap: theme.spacing.sm }}>
                {latestPhotos.map((photo) => (
                  <Card key={photo.id}>
                    <View style={{ gap: theme.spacing.xs }}>
                      <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                        {photo.label ?? "Foto"}
                      </Text>
                      <Text style={{ color: theme.colors.textMuted }}>
                        {photo.imageUrl}
                      </Text>
                    </View>
                  </Card>
                ))}
              </View>
            </View>
          </Card>
        </>
      ) : null}

      <SectionTitle
        title="Timeline"
        description="Entradas mockadas de progresso registradas ate agora."
      />
      <View style={{ gap: theme.spacing.md }}>
        {entries.map((entry) => (
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
