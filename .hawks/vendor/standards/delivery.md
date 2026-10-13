# Ciclo de entrega — 1.2.1

Backlog → história preparada e revisada → Todo → In Progress → In Review → entrega/aceite → Done.

Preparação/revisão da história e build/publicação são etapas registradas na descrição/evidência, não novos estados. Os estados existentes do time INF bastam. Canceled e Duplicate mantêm seu significado. Não renomear estados globalmente para este kit.

| Passagem | Gate |
| --- | --- |
| Backlog → Todo | Problema, resultado, escopo, aceite verificável, dependências e contexto suficientes; revisão da história registrada com autor/data. |
| Todo → In Progress | Responsável/executor explícito, branch e worktree próprias, catálogo/skills aplicáveis lidos e ambiente. Pessoa desconhecida fica a definir; não atribuir por suposição. |
| In Progress → In Review | Matriz de sincronização de fontes/referências conferida, PR, SHA atual, prova de worktree, capacidades usadas, checks proporcionais, limitações e riscos documentados. Nova revisão exige revalidar evidências afetadas. |
| In Review → entrega/aceite | Review de código confirma implementação e critérios. Build/deploy continuam registrados nesta etapa; merge segue autorização local. |
| → Done | Critérios cumpridos, fontes/referências afetadas sincronizadas conforme governança, docs atualizados, integração comprovada e publicação validada quando exigida; limpeza da própria worktree comprovada ou retenção justificada com condição de remoção; exceção sem código justificada. |

Revisão da história avalia prontidão; revisão do código avalia PR/aceite. Nenhuma substitui a outra. Build verde não prova versão servida. PR integrada não encerra épico; verificar filhos e critérios próprios. Datas vencidas são histórico a replanejar com responsável, não permissão para inventar prazo novo.

Em bloqueio, registrar causa, evidência, próxima ação e responsável conhecido. Continuar partes independentes. Não duplicar histórias Done; regressão nova deve citar entrega anterior e comportamento novo. Após entrega, encerrar apenas recursos próprios pelo mecanismo seguro local; trabalho alheio permanece preservado.

Normas canônicas: [worktrees](worktrees.md) e [catálogo de capacidades](toolkit.md). A revisão confere ambas antes de aceitar a fase.
