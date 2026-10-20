# review — smile-check-landing

<!-- hawks:generated; não editar manualmente -->

Leia [AGENTS](../AGENTS.md), o [manifesto](../.hawks/workflow.json) e execute o [prompt comum desta fase](../.hawks/vendor/prompts/review.md). Consulte [produto](../PRODUCT.md), [design](../DESIGN.md) e [contrato local](../docs/project-workflow.md).

No início/retomada execute `python3 .hawks/read.py --phase review`; antes de integrar/publicar acrescente `--critical`. Leia anexos pertinentes com `--document <caminho>`. O leitor compara a main sem trocar as regras da tarefa; diferença exige reconciliação explícita. A versão local é fixada e verificável com `python3 .hawks/check.py`. Antes da fase, carregue catálogo/skills e confira MCPs; retome a execução correta e siga o ciclo da worktree até limpeza ou retenção justificada. Se a tarefa mudar processo compartilhado, aplique a governança central e a propagação global.

A fase deve conferir a sincronização de Linear, fonte central, documentos locais e referências afetadas prevista na governança; a saída registra evidências, não aplicabilidade justificada e pendências.

Feature/fix exige registro durável em `docs/releases/entries/`, conforme [blog e patch notes](../.hawks/vendor/standards/blog-and-release-notes.md). Implementação registra, revisão confere e build/deploy atualiza disponibilidade comprovada. Consolidar semanalmente por produto; central agrega e landing filtra.

Use o [checklist](../.hawks/vendor/standards/task-checklist.md) nos momentos pertinentes e mantenha o [registro de entrega](../.hawks/vendor/templates/delivery-evidence.md). Reconfira base/concorrência/destino antes de integrar ou publicar; mudança relevante invalida as provas afetadas. Obrigações do pedido pendentes mantêm a entrega aberta.
