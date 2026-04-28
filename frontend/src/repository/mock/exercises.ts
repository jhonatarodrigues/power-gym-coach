import type { ExerciseLibraryItem } from "@/types";

export const exerciseLibraryMock: ExerciseLibraryItem[] = [
  {
    id: "exercise-1",
    name: "Supino reto com barra",
    category: "hypertrophy",
    muscleGroup: "chest",
    equipment: "barbell",
    instructions:
      "Manter escapulas encaixadas, pes firmes no chao e controlar a descida da barra ate a linha media do peito.",
    demoVideoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    isCustom: false,
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
  {
    id: "exercise-2",
    name: "Puxada frontal na polia",
    category: "strength",
    muscleGroup: "back",
    equipment: "cable",
    instructions:
      "Puxar a barra em direcao ao peito mantendo o tronco estavel e os cotovelos conduzindo o movimento.",
    demoVideoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80",
    isCustom: false,
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
  {
    id: "exercise-3",
    name: "Agachamento goblet",
    category: "mobility",
    muscleGroup: "legs",
    equipment: "dumbbell",
    instructions:
      "Segurar o halter junto ao peito, descer com controle e priorizar amplitude segura para o joelho.",
    demoVideoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    isCustom: false,
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
  {
    id: "exercise-4",
    name: "Elevacao lateral sentada",
    category: "hypertrophy",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    instructions:
      "Elevar os halteres lateralmente ate a linha dos ombros sem compensar com o trapezio.",
    demoVideoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    isCustom: false,
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
  {
    id: "exercise-5",
    name: "Prancha com toque no ombro",
    category: "rehab",
    muscleGroup: "core",
    equipment: "bodyweight",
    instructions:
      "Manter quadril estavel e alternar o toque das maos nos ombros sem girar o tronco.",
    demoVideoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    isCustom: false,
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
  {
    id: "exercise-6",
    name: "Bicicleta inclinada intervalada",
    category: "cardio",
    muscleGroup: "cardio",
    equipment: "bike",
    instructions:
      "Alternar 1 minuto forte com 1 minuto leve mantendo postura ativa e respiracao controlada.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=600&q=80",
    isCustom: false,
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
  {
    id: "exercise-7",
    name: "Leg press com pausa",
    category: "strength",
    muscleGroup: "legs",
    equipment: "machine",
    instructions:
      "Executar descida controlada, pausar 1 segundo no fundo seguro e subir mantendo joelhos alinhados.",
    demoVideoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    createdByTeacherId: "user-teacher-1",
    isCustom: true,
    createdAt: "2026-04-12T08:00:00.000Z",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
];
