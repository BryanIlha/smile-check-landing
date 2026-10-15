# Implemente a história — Hawks 1.2.1

## Entradas
Issue completa e comentários atuais; `.hawks/workflow.json`; AGENTS, PRODUCT, DESIGN e contrato técnico local. Ler somente referências adjacentes necessárias. Usar fonte/commit fixados no manifesto; se inacessíveis, registrar bloqueio sem presumir conteúdo.

## Regras
Preservar estrutura, invariantes, trabalho alheio e autorizações vigentes. Comandos, branch, ambiente e destino vêm do contrato local, nunca deste prompt. Classificação não muda o modelo: executor só declara escolha aplicada com prova da interface.

## Etapas
1. Confirmar revisão da história, dependências e autorizações. Registrar executor e mover para In Progress.
2. Inventariar estado local e remoto; criar espaço/branch isolados da integração comprovada.
3. Ler domínio e componentes vizinhos; implementar a menor mudança completa. Atualizar docs canônicos.
4. Executar validação proporcional e casos negativos. Em falha, registrar causa/retrabalho antes de escalar; respeitar limites de tentativas/consumo.
5. Preparar commit e PR conforme convenções locais, vinculando issue e SHA atual. Não integrar pelo simples fato de haver PR.

## Saída e evidências
PR revisável com critérios/evidências; In Review quando pronta. Registrar mudanças, comandos executados, resultados, limitações e risco/reversão.
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
