# Governança e atualização global

Esta é a fonte normativa de processo, qualidade, entrega, worktrees, catálogo e prompts Hawks. Produto e identidade visual continuam no repositório de cada produto.

## Regra de manutenção

Toda alteração de processo ou guia compartilhado deve ser feita primeiro em `BZuller/hawks-standards`, numa história, branch e worktree próprias. A entrega deve avaliar todos os consumidores de `registry/projects.json`, atualizar a versão e propagar o pacote para cada projeto aplicável. Alterar somente um AGENTS, prompt ou cópia local do padrão não conclui a mudança.

Uma alteração central inclui: problema, regra anterior/nova, impacto, compatibilidade, validação, lista de consumidores, PR de adoção e pendências de integração. A conclusão global exige adoção integrada ou exclusão explicitamente autorizada, com razão e condição de revisão. Radar está excluído da rodada INF-392 por pedido do usuário; não modificar seu repositório por efeito da propagação.

## Fontes e responsabilidades

- `standards/`: política comum. `prompts/` e `templates/`: execução e entradas derivadas.
- `PRODUCT.md` local: domínio, invariantes e limites. `DESIGN.md` local: autoridade visual e anexos aprovados.
- `docs/project-workflow.md` local: parâmetros, comandos, ambientes e runbooks que cumprem os gates, sem reduzi-los.
- `.hawks/workflow.json`: versão, commit, branch de integração e referências locais.
- `.hawks/vendor/`: cópia gerada do pacote fixado, legível offline. Nunca editar manualmente.
- `AGENTS.md` e `prompts/`: entradas geradas. Blocos de framework Next.js delimitados são preservados.
- Linear: objetivo, decisões e estado da história. `docs/status.md` é fotografia datada, não outro board.
- Histórico/briefs/auditorias preservam evidência; não substituem a norma vigente.

## Aplicar e verificar

Na worktree da história, executar `python3 <checkout-do-padrão>/tools/adopt.py <worktree-do-projeto>`. O checkout da fonte deve estar limpo e no commit desejado; o comando recusa checkout principal, branch de integração e divergência do remote origin declarado. Conferir o diff antes de commit.

Executar `python3 .hawks/check.py` no consumidor. O check verifica integridade do pacote, entradas geradas, referências, campos e comandos de validação. A CI usa o mesmo check em PRs e pushes. Alterar somente o lock para legitimar uma regra local é proibido; revisão deve conferir o commit central.

O controle detecta deriva acidental. Ele não substitui revisão semântica nem permissões GitHub: o administrador deve tornar `Hawks standards / verify` obrigatório nas branches de integração e restringir alterações/bypass nas proteções. Esta entrega não presume que essas configurações administrativas estejam ativas.

## Mudanças locais legítimas

Atualizar domínio, DESIGN, comandos ou runbooks locais é permitido na história do produto. Se a atualização alterar critérios de qualidade/entrega compartilhados, exige também mudança central e propagação. Exceções ficam no manifesto com regra, razão, referência e condição de revisão; não há dispensa tácita. Preserve requisitos locais mais fortes enquanto a norma comum os incorpora por risco/capacidade.

Não usar `latest` como contrato. Cada história registra a versão usada; adoção de nova versão ocorre por diff revisado, sem mudar instruções no meio da execução por atualização remota automática.

## Sincronização obrigatória após mudanças

Toda mudança, inclusive código, configuração, infraestrutura, documentação e assets, exige avaliar suas referências na triagem, revisar o impacto durante a execução e reconciliar as fontes antes do encerramento. Atualizar somente o Linear não basta quando outra fonte ficou desatualizada. Esta avaliação é responsabilidade do agente; a pessoa não precisa listar todos os documentos na história.

- Linear: registrar decisões, estado real, evidências, dependências, links de entrega e pendências na história pertinente.
- Repositório do produto: atualizar PRODUCT, DESIGN, contratos, runbooks, README, índices e demais referências efetivamente afetadas. Preservar particularidades do produto e evitar cópias concorrentes.
- BZuller/hawks-standards: atualizar padrões, catálogo de capacidades, registro dos projetos, biblioteca/manifestos de assets e guias quando a mudança afetar informação compartilhada. Mudanças de norma exigem versão e propagação global; mudança de produto não exige alterar norma sem impacto comum.
- Consumidores e referências derivadas: localizar links, versões fixadas, manifests, prompts gerados e contratos dependentes; atualizar a partir da fonte canônica e verificar a compatibilidade. Registrar repo, caminho e commit/versão utilizados; não usar latest nem substituir silenciosamente versões em tarefas em andamento.
- Galáxia e manuais: se a mudança afetar a estrutura, infraestrutura, documentos ou orientações representadas, atualizar a captura correspondente com origem/data e reconstruir os artefatos derivados. Se não houver evidência suficiente ou acesso, registrar explicitamente que a fotografia está desatualizada e a pendência de atualização; não apresentar dado antigo como estado atual. Históricos imutáveis mantêm sua data e recebem referência à nova decisão, sem reescrever a evidência antiga.

A história e a PR devem trazer uma matriz curta: fonte/referência, impacto, ação, evidência (commit/versão/link) e pendência. Para fontes sem impacto, registrar “não se aplica” com razão concreta; não editar todos os documentos por rotina nem afirmar que foram sincronizados sem conferir. Não copiar segredos ou documentação privada para artefatos públicos.

A revisão confere essa matriz contra o diff e as dependências conhecidas. Done exige referências afetadas atualizadas e verificadas; impedimento concreto fica como bloqueio ou exceção explicitamente aceita conforme o contrato local, com ação, responsável conhecido e condição de resolução. Falta de acesso não autoriza inventar evidência, ampliar permissões, publicar ou fazer merge. Aplicam-se as autorizações e worktrees de cada repositório.
