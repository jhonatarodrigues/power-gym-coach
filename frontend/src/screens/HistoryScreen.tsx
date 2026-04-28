import { View } from "react-native";

import { Header, HistoryCard, Screen, SectionTitle } from "@/components";
import { archivedPlansMock, historyRecordsMock, progressEntriesMock } from "@/repository/mock";

export function HistoryScreen() {
  return (
    <Screen>
      <Header
        title="History"
        subtitle="Area dedicada somente a planos passados, progresso antigo e registros encerrados."
      />

      <SectionTitle
        title="Registros recentes"
        description="Linha do tempo consolidada do historico."
      />
      <View style={{ gap: 16 }}>
        {historyRecordsMock.map((record) => (
          <HistoryCard key={record.id} record={record} />
        ))}
      </View>

      <SectionTitle
        title="Planos arquivados"
        description="Apenas planos antigos ficam nesta area."
      />
      <View style={{ gap: 16 }}>
        {archivedPlansMock.map((plan) => (
          <HistoryCard
            key={plan.id}
            record={{
              id: plan.id,
              studentId: plan.studentId,
              type: "plan",
              title: plan.title,
              description: `${plan.startDate} ate ${plan.endDate}`,
              date: plan.endDate ?? plan.startDate,
            }}
          />
        ))}
      </View>

      <SectionTitle
        title="Progresso antigo"
        description="Entradas anteriores de peso, BF e fotos."
      />
      <View style={{ gap: 16 }}>
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
