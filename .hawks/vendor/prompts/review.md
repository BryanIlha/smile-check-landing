# Revise a implementação — Hawks 1.2.0

## Entradas
Issue completa e comentários atuais; `.hawks/workflow.json`; AGENTS, PRODUCT, DESIGN e contrato técnico local. Ler somente referências adjacentes necessárias. Usar fonte/commit fixados no manifesto; se inacessíveis, registrar bloqueio sem presumir conteúdo.

## Regras
Preservar estrutura, invariantes, trabalho alheio e autorizações vigentes. Comandos, branch, ambiente e destino vêm do contrato local, nunca deste prompt. Classificação não muda o modelo: executor só declara escolha aplicada com prova da interface.

## Etapas
1. Ler história, critérios, contrato e diff completo da PR no SHA atual.
2. Verificar domínio, isolamento, erros, recuperação, docs e adequação dos testes. Não confundir evidência antiga com checks atuais.
3. Reproduzir cenários relevantes; reportar achados acionáveis com arquivo/linha, impacto e reprodução.
4. Corrigir escopo autorizado ou registrar bloqueio; alterações posteriores invalidam apenas provas afetadas, mas exigem nova revisão.
5. Registrar parecer e gates de entrega. Revisão própria deve ser identificada; não alegar revisão independente.

## Saída e evidências
Parecer com SHA e critérios aprovados/pendentes, resultados reais e próxima ação de integração. Nenhuma aprovação fictícia ou conclusão do épico.
Registrar modelo/esforço solicitado e aplicado, interface, consumo conhecido ou null, escaladas, retrabalho e resultado conforme templates/execution.json.

## Capacidades, isolamento e encerramento obrigatórios

Antes da fase, ler [catálogo comum](../standards/toolkit.md) e [ciclo de worktrees](../standards/worktrees.md) no commit adotado. Selecionar e ler skills/playbooks aplicáveis; conferir configuração e disponibilidade por operação. Usar MCP suficiente; registrar limitação e fallback quando necessário.

Consultar issue/PRs/branches e inventário Git para retomar a execução correta. Toda edição versionada, inclusive correção de documentação/review, usa branch e worktree próprias; checkout principal é referência/integração. Projeto novo cria worktree antes do conteúdo. Seguir convenção portátil e exceções locais registradas.

Saída da fase inclui capacidades consultadas/usadas, worktree e branch, SHA e pendências. Revisão e preparação de entrega conferem remoto persistido, integração/aceite, arquivos ignorados importantes e configuração de cliente antes da limpeza. Ao concluir, remover somente a própria worktree pelo mecanismo Git/local suportado; se não puder, registrar motivo e condição de remoção no Linear e no relatório final. Não declarar Done ou limpeza por aproximação.

## Manutenção dos padrões

Consultar [governança](../standards/governance.md) e [qualidade](../standards/quality.md). Mudança comum exige atualização central, versão e propagação; especificações do produto ficam nas fontes locais. Conferir `python3 .hawks/check.py` antes da revisão.
