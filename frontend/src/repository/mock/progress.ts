import type { HistoryRecord, ProgressEntry } from "@/types";

export const progressEntriesMock: ProgressEntry[] = [
  {
    id: "progress-entry-1",
    studentId: "user-student-1",
    date: "2026-03-10",
    weightKg: 61.8,
    bodyFatPercentage: 23.4,
    notes: "Inicio do acompanhamento com foco em estrutura de rotina.",
    photos: [
      {
        id: "progress-photo-1",
        imageUrl:
          "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
        label: "Comparativo inicial",
      },
    ],
    createdAt: "2026-03-10T09:00:00.000Z",
  },
  {
    id: "progress-entry-2",
    studentId: "user-student-1",
    date: "2026-04-26",
    weightKg: 63.1,
    bodyFatPercentage: 21.8,
    notes: "Mais firmeza em membros inferiores e melhor resposta ao treino.",
    photos: [
      {
        id: "progress-photo-2",
        imageUrl:
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
        label: "Atual",
      },
    ],
    createdAt: "2026-04-26T14:10:00.000Z",
  },
];

export const historyRecordsMock: HistoryRecord[] = [
  {
    id: "history-record-1",
    studentId: "user-student-1",
    type: "plan",
    title: "Plano de adaptacao metabolica encerrado",
    description: "Ciclo anterior concluido em 14 de abril.",
    date: "2026-04-14",
  },
  {
    id: "history-record-2",
    studentId: "user-student-1",
    type: "assessment",
    title: "Avaliacao corporal revisada",
    description: "Revisao do professor com novo ajuste de treino e dieta.",
    date: "2026-04-27",
  },
  {
    id: "history-record-3",
    studentId: "user-student-1",
    type: "progress",
    title: "Atualizacao de progresso registrada",
    description: "Entrada com fotos e medidas de abril.",
    date: "2026-04-26",
  },
  {
    id: "history-record-4",
    studentId: "user-student-1",
    type: "exam",
    title: "Exame enviado",
    description: "Hemograma completo e vitamina D anexados.",
    date: "2026-04-25",
  },
];
