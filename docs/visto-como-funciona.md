# Visto: como funciona e o que entrega

## Resumo

O Visto é o produto de rotinas operacionais da HAWKS BI. Ele transforma uma rotina que hoje vive em planilhas, mensagens ou instruções soltas em um fluxo único de configuração, execução e acompanhamento.

O produto não substitui o processo da operação. Ele organiza o processo existente para que cada pessoa saiba o que precisa fazer e a gestão consiga acompanhar o que aconteceu.

## Para quem é

- **Operador:** executa a rotina no setor e responde cada item no momento da atividade.
- **Gestor:** acompanha o andamento, identifica pendências e revisa correções.
- **Administrador:** configura setores, rotinas, acessos, grupos e regras da organização.

## Como funciona

### 1. A organização configura a rotina

O administrador estrutura a operação no Visto:

- cria setores e mantém cada um ativo ou inativo;
- cria rotinas ligadas a um setor;
- define descrição, turnos, dias da semana e horários de vencimento;
- organiza itens e subrotinas na ordem em que devem ser executados;
- define o tipo de checagem de cada item;
- configura limites mínimo e máximo para itens de temperatura;
- define quando uma foto é exigida;
- controla o acesso por organização, perfil e grupo.

### 2. O operador executa

Para cada rotina, o Visto cria uma execução com data, turno, setor, responsável e status. O operador acompanha a fila e responde item a item.

Os estados usados na execução são:

- `pendente`: ainda não respondido;
- `em_andamento`: a rotina começou, mas não foi enviada;
- `finalizado`: a execução foi concluída.

Cada item pode ser registrado como:

- `pendente`;
- `conforme`;
- `nao_conforme`.

Quando algo não está conforme, o registro pode incluir uma correção. O item também guarda o horário da resposta e, quando a rotina exigir, uma foto.

### 3. A gestão acompanha e age

O gestor encontra o que precisa de atenção sem reconstruir o histórico manualmente:

- vê quais rotinas estão pendentes, em andamento ou finalizadas;
- identifica itens não conformes;
- acompanha leituras de temperatura e seus limites;
- consulta correções, horários e evidências associadas ao item;
- recebe notificações configuradas para início e finalização de rotinas;
- usa grupos de acesso para acompanhar apenas o que pertence à sua operação.

## Tipos de checagem

O banco do Visto hoje registra dois tipos de item:

- **Smile:** checagem operacional simples, respondida como conforme ou não conforme;
- **Temperatura:** checagem com faixa mínima/máxima e registro da temperatura medida.

O modelo também suporta exigência de foto por item. A foto só deve ser comunicada como obrigatória quando estiver configurada na rotina.

## O que o Visto entrega

No fim de cada execução, o produto entrega uma visão operacional com:

1. **Rotina configurada:** setor, turno, dia, horário, itens e subrotinas no fluxo certo.
2. **Execução rastreável:** responsável, data, status e horário de cada resposta.
3. **Exceção visível:** itens não conformes, correções e temperaturas fora dos limites configurados.
4. **Histórico de operação:** registros ligados à rotina e ao item correto.
5. **Acompanhamento por acesso:** organizações, perfis, grupos e rotinas visíveis para cada papel.
6. **Notificações operacionais:** eventos de início e finalização para gestores inscritos.

## Modelo de dados que sustenta o produto

| Conceito | Tabelas principais |
| --- | --- |
| Organização e usuários | `organizations`, `profiles`, `user_roles` |
| Setores e rotinas | `sectors`, `routines`, `subroutines`, `sector_items` |
| Execução | `routine_runs`, `routine_run_items` |
| Acesso | `access_groups`, `access_group_members`, `access_group_routines` |
| Notificações | `manager_notification_preferences`, `notification_subscriptions`, `notification_events` |

## Segurança e isolamento

As tabelas expostas no schema `public` estão com RLS habilitado e sem políticas para acesso anônimo. As políticas atuais restringem a leitura e escrita a usuários autenticados e validam a organização do usuário.

Na revisão do banco, também foram reforçadas quatro políticas que validam relações entre rotinas, setores e subrotinas. Antes, duas condições comparavam uma coluna com ela mesma e não validavam o vínculo real. A correção foi aplicada na migration `tighten_routine_relationship_policies`.

Pendência de produção: o advisor de segurança do Supabase ainda indica que a proteção contra senhas vazadas está desativada no Auth. Ela deve ser habilitada no painel do projeto antes do lançamento. O advisor de performance lista índices sem uso observado; eles não foram removidos porque a ausência de uso pode refletir apenas o volume atual ou caminhos ainda pouco acessados.

## Limites para a comunicação comercial

- A interface da landing usa dados fictícios e deve continuar identificada como demonstração.
- Não comunicar percentuais de conformidade, economia de tempo ou resultados de clientes sem uma fonte real e autorizada.
- Comunicar foto como “quando exigida/configurada”, não como parte obrigatória de toda checagem.
- O produto atual deve ser descrito como um sistema de configuração, execução e acompanhamento de rotinas; não como uma plataforma genérica de BI.
