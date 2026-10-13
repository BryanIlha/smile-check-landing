# Prepare e valide a entrega — Hawks 1.2.1

## Entradas
Issue completa e comentários atuais; `.hawks/workflow.json`; AGENTS, PRODUCT, DESIGN e contrato técnico local. Ler somente referências adjacentes necessárias. Usar fonte/commit fixados no manifesto; se inacessíveis, registrar bloqueio sem presumir conteúdo.

## Regras
Preservar estrutura, invariantes, trabalho alheio e autorizações vigentes. Comandos, branch, ambiente e destino vêm do contrato local, nunca deste prompt. Classificação não muda o modelo: executor só declara escolha aplicada com prova da interface.

## Etapas
1. Confirmar PR, autorização de integração/publicação, base e SHA aprovado; completar preparação antes de pedir uma autorização que realmente falte.
2. Seguir runbook local para build/migrations/backup/rollout. Revalidar destino e gatilhos; evitar nova emissão, mensagem ou dado real fora do escopo.
3. Registrar etapa de build/publicação na issue existente; não criar estado novo.
4. Conferir SHA servido, health e fluxo previsto; build/success do orquestrador não substituem leitura do destino. Falha segue rollback local.
5. Atualizar docs/Linear. Done apenas com critérios cumpridos e publicação quando exigida. Documentação pura pode dispensar deploy com justificativa.

## Saída e evidências
Matriz preparado/implementado/integrado/publicado/validado, SHA/URL/data, aceite e pendências; recursos próprios encerrados somente com segurança.
Registrar modelo/esforço solicitado e aplicado, interface, consumo conhecido ou null, escaladas, retrabalho e resultado conforme templates/execution.json.

## Capacidades, isolamento e encerramento obrigatórios

Antes da fase, ler [catálogo comum](../standards/toolkit.md) e [ciclo de worktrees](../standards/worktrees.md) no commit adotado. Selecionar e ler skills/playbooks aplicáveis; conferir configuração e disponibilidade por operação. Usar MCP suficiente; registrar limitação e fallback quando necessário.

Consultar issue/PRs/branches e inventário Git para retomar a execução correta. Toda edição versionada, inclusive correção de documentação/review, usa branch e worktree próprias; checkout principal é referência/integração. Projeto novo cria worktree antes do conteúdo. Seguir convenção portátil e exceções locais registradas.

Saída da fase inclui capacidades consultadas/usadas, worktree e branch, SHA e pendências. Revisão e preparação de entrega conferem remoto persistido, integração/aceite, arquivos ignorados importantes e configuração de cliente antes da limpeza. Ao concluir, remover somente a própria worktree pelo mecanismo Git/local suportado; se não puder, registrar motivo e condição de remoção no Linear e no relatório final. Não declarar Done ou limpeza por aproximação.

## Manutenção dos padrões

Consultar [governança](../standards/governance.md) e [qualidade](../standards/quality.md). Mudança comum exige atualização central, versão e propagação; especificações do produto ficam nas fontes locais. Conferir `python3 .hawks/check.py` antes da revisão.

## Sincronização das fontes

Aplicar a seção “Sincronização obrigatória após mudanças” da [governança](../standards/governance.md): mapear impacto nesta fase, atualizar Linear, fonte central, documentos locais e referências/derivados pertinentes. Registrar matriz fonte/impacto/ação/evidência/pendência ou não aplicabilidade justificada. Revisão confere o diff; encerramento exige reconciliação ou exceção aceita, sem presumir acesso, publicação ou merge.

## Registro para o blog
Toda feature/fix segue [blog e patch notes](../standards/blog-and-release-notes.md): registrar em `docs/releases/entries/`, conferir na revisão e atualizar disponibilidade após integração/publicação comprovadas. Preparar edição semanal por produto, mantendo notícias e notas na fonte central e listas filtradas nas landings.
