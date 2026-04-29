# Repository

Esta pasta centraliza todas as chamadas de API.

Diretrizes:
- separar por contexto de dominio
- manter tipagem de request/response
- evitar chamadas diretas dentro de telas e componentes

## Mock first
- `mock/` guarda os dados falsos da primeira fase do frontend
- usar esses dados para telas, hooks e Storybook antes da API real

## Contratos de dominio
- `contracts.ts` define interfaces de acesso por dominio
- as telas devem preferir contratos/repositorios em vez de depender diretamente da estrutura do mock
- isso facilita trocar a implementacao mock por API real depois

## Adaptadores por dominio
- `assessmentRepository.ts`
- `examRepository.ts`
- `planRepository.ts`
- `progressRepository.ts`
- `studentRepository.ts`

Esses arquivos funcionam como ponto de entrada estavel por dominio.
Na fase mockada eles apontam para implementacoes locais.
Quando a API real entrar, a ideia e trocar a implementacao por dominio sem reescrever telas e hooks.
