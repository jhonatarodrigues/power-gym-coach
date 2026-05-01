import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  AthleteListItem,
  Button,
  Header,
  Screen,
  SectionTitle,
} from "@/components";
import type { RootStackParamList } from "@/navigation/types";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useAppTheme } from "@/theme";

export function CoachStudentsScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const students = useCoachContextStore((state) => state.students);
  const selectStudent = useCoachContextStore((state) => state.selectStudent);
  const getPlansByStudent = useCoachContextStore((state) => state.getPlansByStudent);

  return (
    <Screen>
      <Header
        title="Alunos"
        subtitle="Selecione o aluno para abrir planos, feedbacks e comunicacao."
      />

      <SectionTitle
        title="Carteira ativa"
        description="Cada aluno abre sua propria trilha de planos e acompanhamento."
      />

      <View style={{ gap: theme.spacing.md }}>
        {students.map(({ profile, user }) => {
          const plans = getPlansByStudent(user.id);
          const activePlan = plans.find((plan) => plan.status === "active" || plan.status === "draft");

          return (
            <View key={user.id} style={{ gap: theme.spacing.sm }}>
              <AthleteListItem
                name={user.name}
                focus={profile.goal}
                status={activePlan?.title ?? "Sem plano ativo"}
              />
              <Button
                label={`Abrir planos de ${user.name.split(" ")[0]}`}
                onPress={() => {
                  selectStudent(user.id);
                  navigation.navigate("CoachStudentPlans");
                }}
              />
            </View>
          );
        })}
      </View>
    </Screen>
  );
}
