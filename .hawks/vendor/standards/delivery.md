# Ciclo de entrega

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

Features/fixes exigem [registro para os patch notes](blog-and-release-notes.md) antes da revisão/encerramento. Disponibilidade e estado editorial são independentes; publicação do blog não é requisito para encerrar o fix já registrado.

## Resultado contratado e obrigações

Antes de executar, relacionar cada critério ao resultado pedido, prova, ambiente e autorização pertinentes. Identificar dependências e partes independentes. Investigar requisitos técnicos sem exigir que Bruno/Bryan editem código ou listem os documentos afetados. Respeitar autorização já dada; solicitar decisão somente quando faltar autoridade, houver conflito de intenção ou uma regra específica exigir confirmação.

- Pesquisa/diagnóstico: responder ao objetivo com fontes, data, limites e artefato no destino pedido; cobertura insuficiente permanece resultado parcial.
- Proposta/documento: entregar texto revisável, consistente e distinto da norma vigente; implementação futura não é requisito artificial.
- Código até integração: comprovar critérios técnicos, revisão/validação, integração, fontes e encerramento; publicação pode ser não aplicável conforme o pedido.
- Disponibilização/automação: além dos gates anteriores aplicáveis, comprovar publicação/ativação autorizada, identidade e efeito no destino, recuperação e aceite exigidos. PR, rascunho ou build não encerram promessa de produção.
- Padrão comum: separar integração da fonte central e adoção global conforme [governança](governance.md); etapa central autorizada não atualiza consumidores por inferência.

Usar [checklist nos três momentos](task-checklist.md) e [registro de entrega](../templates/delivery-evidence.md) no registro existente da tarefa/PR, sem outro board. Por obrigação, declarar atendida, pendente, não aplicável com motivo ou exceção aceita com referência. “Não aplicável” não remove compromisso explícito. Redução de escopo exige decisão rastreável de quem tem autoridade; abrir outra issue não elimina obrigação do pedido original.

Antes de Done, verificar se falta critério, coerência de fonte crítica, integração, disponibilidade ou aceite exigido. Obrigação essencial pendente mantém a tarefa aberta. Exceção deve ser admissível, explicitamente aceita, com regra, razão, autoridade, referência, controle compensatório e condição de resolução. Separar implementado, validado, integrado, publicado e aceito; desconhecido permanece desconhecido. Silêncio não é aceite. Épicos/transversais têm critérios próprios, além dos filhos concluídos. Conferir o estado realmente gravado no Linear.

## Controles existentes e automação futura

`tools/check.py` verifica integridade/entradas/manifesto; `scripts/check-worktree.mjs` verifica identidade local. Eles não comprovam operação, concorrência global, validade semântica da evidência, proteção administrativa nem impedimento nativo de Done. O checklist desta versão é um reforço documental usado pelo agente e pela revisão. A leitura de serviços, associação obrigatória candidato/base, serialização da integração, validação automática das obrigações e detecção de referências vencidas exigem implementação/adaptadores futuros e autorização própria.

Detector opcional não equivale a enforcement. Só declarar bloqueio obrigatório quando o caminho real de integração/publicação/conclusão consumir o controle e houver prova da cobertura e do bypass. Plataformas indisponíveis deixam a verificação afetada desconhecida; não autorizam aprovação automática. As regras não criam deploy ou transição automática após checks verdes.
