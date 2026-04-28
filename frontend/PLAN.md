# Plano de inicio do app

## Objetivo
Subir a base do app `Power Gym Coach` com Expo, TypeScript, Storybook e arquitetura pronta para escalar.

## Direcao de produto
- App de acompanhamento para personal trainer.
- Visual principal escuro.
- Laranja como cor de destaque e acao.
- Dark mode tratado como experiencia principal.

## Fase 1: Bootstrap do projeto
1. Inicializar Expo com TypeScript em `frontend`.
2. Organizar a estrutura de `src`.
3. Configurar aliases e convencoes basicas.
4. Criar arquivos base:
   - `App.tsx`
   - `src/navigation`
   - `src/store`
   - `src/theme`

## Fase 2: Fundacao tecnica
1. Instalar e configurar React Navigation.
2. Instalar e configurar Zustand.
3. Instalar e configurar React Hook Form.
4. Definir padrao de repositories para chamadas de API.
5. Definir tipos compartilhados em `src/types`.

## Fase 3: Sistema de tema
1. Criar tokens de design:
   - colors
   - spacing
   - typography
   - radius
2. Criar `ThemeProvider`.
3. Criar hook `useAppTheme`.
4. Estruturar suporte a dark mode.

## Estrategia para dark mode
- O tema dark sera o padrao inicial.
- A arquitetura deve permitir tema light no futuro sem retrabalho.
- Componentes nunca devem usar cores hardcoded fora dos tokens.
- Storybook deve conseguir alternar temas para validacao visual.

## Fase 4: Storybook
1. Configurar Storybook junto com Expo.
2. Criar decoradores globais para:
   - tema
   - spacing base
   - backgrounds dark
3. Organizar stories por componente.
4. Definir criterio: nenhum componente entra em tela sem story.

## Componentes iniciais para Storybook
1. `Button`
2. `TextField`
3. `PasswordField`
4. `Card`
5. `Screen`
6. `Header`
7. `SectionTitle`
8. `MetricCard`
9. `AthleteListItem`
10. `EmptyState`

## Fase 5: Primeira tela
1. Home do personal.
2. Cards de resumo.
3. Lista curta de alunos.
4. Acoes rapidas.
5. Estado vazio para cenarios sem dados.

## Ordem recomendada de execucao
1. Bootstrap do Expo.
2. Tema dark.
3. Storybook.
4. Componentes base.
5. Home inicial.

## Regras de implementacao
- Componentes com responsabilidade unica.
- Regras de negocio em `src/hooks`.
- API somente em `src/repository`.
- Tipos compartilhados em `src/types`.
- Estado global apenas quando realmente compartilhar contexto.
