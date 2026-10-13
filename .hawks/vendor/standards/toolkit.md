# Catálogo Hawks de skills e MCPs — 1.2.0

Catálogo único para todos os perfis, adotado pelo commit de `.hawks/workflow.json`. Não implica que todas as capacidades sejam usadas em toda história nem que estejam instaladas em toda máquina. Antes de **cada fase**, selecionar capacidades pelo escopo, descobrir a instalação/conexão real, ler a skill/playbook e schema da ferramenta, verificar acesso e registrar resultado. Usar MCP disponível e suficiente. Fallback deve identificar limitação observada, alternativa suportada e mesmas autorizações; nunca trocar silenciosamente a integração por shell, SQL, browser ou API improvisada.

## Capacidades obrigatórias do catálogo

| Capacidade e referência canônica | Finalidade e leitura obrigatória | Configuração e prova em 11/10/2026 | Alternativa quando não suporta a operação |
| --- | --- | --- | --- |
| **Impeccable**, skill instalada `impeccable`, versão observada 4.5.2 | Trabalho visual/UX: ler SKILL.md, executar setup `impeccable context` no projeto e ler playbook pertinente; craft-floor antes de editar UI. Preservar identidade e domínio. | SKILL.md e launcher presentes neste cliente; não houve tarefa visual de produto nem execução do launcher nesta auditoria. Cada máquina deve resolver o caminho pelo catálogo de skills, sem caminho pessoal versionado. | Falha do launcher segue o fallback explícito da própria skill: informar e ler PRODUCT/DESIGN diretamente. Não substituir o método por outra skill. Gate local mais específico de Visto/Conexo permanece aplicável. |
| **Linear**, MCP `linear` / conexão Linear | História, prontidão, estado, relações, aceite e pendências. Ler schemas das operações e standards/delivery.md; consultar issue atual antes de alterar. | Conexão desta conversa validada por leitura/atualização de INF-392. O MCP Hawks separado ainda não tem LINEAR_API_KEY. | Se operação ausente, usar outra operação suficiente do conector; se indisponível, preparar patch e registrar pendência. API oficial somente com acesso configurado e limitação explícita; não manter réplica manual de estado. |
| **Coolify**, documentação oficial e runbook local de publicação | Operar o recurso/ambiente certo e comprovar SHA servido, health e reversão. Ler runbook local, contrato técnico e schema da integração antes de agir. | Nenhum MCP Coolify exposto/configurado neste cliente; busca de plugin Coolify não retornou resultado. Runbooks existem, mas acesso à instância/API não foi testado. Configurar endpoint, conta/token com escopo e recurso permitido fora do Git. | Seguir mecanismo real: CI/GitHub App ou UI/API oficial autorizada, documentando a falta de ferramenta. Conexo exige Promote staging e Coolify seguindo staging; deploy manual não substitui promoção com falha. |
| **n8n**, MCP oficial `n8n` / conexão `n8n Hawks` | Automações pertinentes. Antes de código: get_workflow_sdk_reference e get_workflow_best_practices; descobrir nodes/tipos/recursos, validar configuração e workflow antes de criar/atualizar. Ler versão atual e preservar credenciais/vínculos. | Consulta somente leitura de projetos respondeu neste cliente. Conexão autenticada presente; nenhuma automação foi criada, executada ou publicada nesta tarefa. Disponibilidade de cada operação/credencial continua contextual. | Operação não suportada: exportação/importação ou UI/API oficial conforme documentação e autorização, com diferença revisável. Publicação/execução que envia mensagens ou produz efeitos externos exige escopo correspondente. |

Referências oficiais: [Coolify](https://coolify.io/docs/), [n8n](https://docs.n8n.io/), [Linear API](https://linear.app/developers), além dos SKILL.md e schemas efetivamente instalados. As fontes externas evoluem: revalidar antes da operação. Não inventar um servidor Coolify ou uma skill Linear que não estejam disponíveis.

## Outras capacidades aprovadas por escopo

| Capacidade | Uso, instruções e configuração | Disponibilidade e alternativa |
| --- | --- | --- |
| GitHub MCP/conexão | Refs, PRs, checks e evidência; ler schemas, template de PR e regras de branch. Git CLI fica para trabalho local, worktrees, commits e transporte Git autorizado. | Leitura e escrita de branches verificadas. Criação de PR pode exigir formulário do cliente; formulário aberto não é PR criada. Não contornar confirmação pela API/CLI. |
| Hawks Workflow MCP | Ler docs/mcp.md e docs/models.md; contexto, triagem e entrega com proveniência. Instalar Node/lock e configurar fontes/credenciais. | Handshake/4 ferramentas e chamada via Codex CLI testados; contexto local respondeu, Linear sem chave bloqueou honestamente. Não substitui ferramentas de escrita Linear/GitHub. |
| OpenAI docs / Decisions / Responses | Skill `openai-docs`, documentação oficial e política de catálogo; classificação separada do executor. | Skill e adaptadores presentes; APIs pagas não chamadas por falta de chave. Sem credenciais: testes com fixtures identificadas e pendência explícita. |
| Supabase | Skills `supabase:supabase` e práticas Postgres quando aplicável; ler antes de Auth/DB/migrations e respeitar projeto/ambiente. | Skill e conexão disponíveis no catálogo; nenhuma consulta administrativa ou escrita de banco usada nesta auditoria. Validar acesso ao projeto antes de operar; fallback CLI oficial somente com alvo/credenciais verificados. |
| Playwright / navegador do cliente | Validar fluxos e estados visuais; ler schemas/API documentada. No Visto, Playwright continua obrigatório para mudança de design. | Ferramentas expostas; aplicação autenticada e dispositivos físicos não testados nesta rodada. Se faltar capacidade obrigatória, registrar bloqueio, não substituir teste físico por emulação. |
| Google Drive/Docs | Skills do plugin Google Drive para documentos externos pertinentes; não copiar estado comercial para repositórios públicos. | Busca foi utilizada nesta auditoria; usar conexão autorizada. Se arquivo inacessível, pedir referência sem declarar leitura. |

Capacidades de imagem, design, SEO, documentos e apresentações podem ser usadas quando os gatilhos de suas skills se aplicarem. Adicionar dependência obrigatória nova requer PR no catálogo, referência verificável, configuração e fallback, sem instalar todas em todo projeto por rotina.

## Exigências locais preservadas

Conexo mantém Impeccable para UX/UI material, modos/playbooks pertinentes, avaliações independentes e Multi-Agent quando a regra local exige, testes no browser e promoção de staging pelo mesmo SHA. Os nomes antigos de skills `control-in-app-browser`, `computer-use` e `responsive-design` devem ser resolvidos no catálogo instalado; não presumir existência nem trocar a finalidade. Browser suportado disponível pode cumprir inspeção quando a skill permitir, com escolha registrada. Visto mantém ESTETICA, Playwright e seus gates visuais. Nenhuma capacidade comum autoriza redesenhar produto, mover dados ou publicar fora do escopo.

## Evidência por fase

Registrar nome/versão ou referência lida, gatilho, disponibilidade (exposta/configurada/testada), operação exercida, resultado, limitações e fallback adotado. Ausência de uma capacidade dispensável não bloqueia a fase; capacidade indispensável sem alternativa suficiente bloqueia somente o trabalho dependente. Registrar no Linear a configuração restante e seu responsável, sem atribuir pessoa por suposição.

## Extensões identificadas no inventário

- GSAP no Hawks Site: oito skills em `.agents/skills/gsap-{core,frameworks,performance,plugins,react,scrolltrigger,timeline,utils}/SKILL.md`. Origem canônica é o commit adotado do Site; ler a skill pertinente antes de animação/integração GSAP. Arquivos inventariados; execução e versão do runtime devem ser verificadas no projeto. Complementam Impeccable, não substituem sua direção. Se não houver acesso, ler a API instalada/documentação oficial e registrar a limitação; não declarar a skill executada.
- Radar SKILL.MD de dashboards: orientação específica inventariada, fora da propagação atual por pedido do usuário. Não aplicar sua composição visual como norma global.
- Adaptadores CLAUDE apontam AGENTS. Blocos de framework gerados permanecem locais e não autorizam mudar o processo comum.
