import { Text, View } from "react-native";

import { useAppTheme } from "@/theme";

import { AthleteListItem } from "@/components/AthleteListItem";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { PasswordField } from "@/components/PasswordField";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { TextField } from "@/components/TextField";

export function Showcase() {
  const { theme } = useAppTheme();

  return (
    <Screen>
      <Header
        title="Power Gym Coach UI"
        subtitle="Catalogo visual com tema dark, tipografia, botoes, cards e estados base."
      />

      <SectionTitle
        title="Typography"
        description="Escala inicial de texto para o app."
      />
      <View style={{ gap: theme.spacing.sm }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.title,
            fontWeight: "800",
          }}
        >
          Title / Dashboard do Personal
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.subtitle,
            fontWeight: "700",
          }}
        >
          Subtitle / Resumo da semana
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.body,
          }}
        >
          Body / Acompanhe alunos, treinos, avaliacoes e performance.
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: theme.typography.caption,
          }}
        >
          Caption / Atualizado ha 5 minutos.
        </Text>
      </View>

      <SectionTitle
        title="Buttons"
        description="Acoes principais e secundarias."
      />
      <View style={{ gap: theme.spacing.md }}>
        <Button label="Criar novo treino" />
        <Button label="Ver alunos" variant="ghost" />
        <Button label="Salvando..." loading />
      </View>

      <SectionTitle
        title="Forms"
        description="Campos base para login e cadastro."
      />
      <View style={{ gap: theme.spacing.md }}>
        <TextField
          label="Nome do aluno"
          placeholder="Ex.: Marina Costa"
          hint="Campo base de texto."
        />
        <PasswordField
          label="Senha"
          placeholder="Digite a senha"
          hint="Controle simples de senha."
        />
      </View>

      <SectionTitle
        title="Metrics"
        description="Indicadores de alto contraste para a home."
      />
      <View style={{ gap: theme.spacing.md }}>
        <MetricCard label="alunos ativos" value="24" trend="+3 esta semana" />
        <MetricCard label="treinos pendentes" value="07" trend="revisar hoje" />
      </View>

      <SectionTitle
        title="Lists"
        description="Padrao para resumir alunos rapidamente."
        actionLabel="Ver todos"
      />
      <View style={{ gap: theme.spacing.md }}>
        <AthleteListItem
          name="Marina Costa"
          focus="Hipertrofia e condicionamento"
          status="Em dia"
        />
        <AthleteListItem
          name="Lucas Mendes"
          focus="Reducao de gordura"
          status="Revisar"
        />
      </View>

      <SectionTitle
        title="Empty States"
        description="Cenario base quando ainda nao houver dados."
      />
      <EmptyState
        title="Nenhum treino criado"
        description="Comece criando o primeiro treino para um aluno e use este padrao nas telas vazias."
        actionLabel="Criar treino"
      />
    </Screen>
  );
}
