# Crie um aplicativo — Hawks 1.2.0

## Entradas
Issue completa e comentários atuais; `.hawks/workflow.json`; AGENTS, PRODUCT, DESIGN e contrato técnico local. Ler somente referências adjacentes necessárias. Usar fonte/commit fixados no manifesto; se inacessíveis, registrar bloqueio sem presumir conteúdo.

## Regras
Preservar estrutura, invariantes, trabalho alheio e autorizações vigentes. Comandos, branch, ambiente e destino vêm do contrato local, nunca deste prompt. Classificação não muda o modelo: executor só declara escolha aplicada com prova da interface.

## Etapas
1. Confirmar problema, público, entidades, jornada inicial e identidade oficial. Registrar decisões ainda abertas.
2. Aplicar perfil aplicativo. Declarar capacidades necessárias e ausentes; não impor módulos comuns por conveniência.
3. Escolher stack/estrutura/ambientes pela história e contexto; registrar decisões no contrato técnico e PRODUCT.
4. Criar README, AGENTS curto, PRODUCT, DESIGN, contrato, status e runbooks pertinentes; fixar versão Hawks.
5. Implementar a primeira jornada e validar comportamento/limites. Preparar PR e entrega seguindo os prompts de manutenção.

## Saída e evidências
Aplicativo mínimo utilizável e revisável, identidade com procedência, decisões documentadas e evidências. Infra/publicação só quando autorizadas e comprovadas.
Registrar modelo/esforço solicitado e aplicado, interface, consumo conhecido ou null, escaladas, retrabalho e resultado conforme templates/execution.json.

## Capacidades, isolamento e encerramento obrigatórios

Antes da fase, ler [catálogo comum](../standards/toolkit.md) e [ciclo de worktrees](../standards/worktrees.md) no commit adotado. Selecionar e ler skills/playbooks aplicáveis; conferir configuração e disponibilidade por operação. Usar MCP suficiente; registrar limitação e fallback quando necessário.

Consultar issue/PRs/branches e inventário Git para retomar a execução correta. Toda edição versionada, inclusive correção de documentação/review, usa branch e worktree próprias; checkout principal é referência/integração. Projeto novo cria worktree antes do conteúdo. Seguir convenção portátil e exceções locais registradas.

Saída da fase inclui capacidades consultadas/usadas, worktree e branch, SHA e pendências. Revisão e preparação de entrega conferem remoto persistido, integração/aceite, arquivos ignorados importantes e configuração de cliente antes da limpeza. Ao concluir, remover somente a própria worktree pelo mecanismo Git/local suportado; se não puder, registrar motivo e condição de remoção no Linear e no relatório final. Não declarar Done ou limpeza por aproximação.

## Manutenção dos padrões

Consultar [governança](../standards/governance.md) e [qualidade](../standards/quality.md). Mudança comum exige atualização central, versão e propagação; especificações do produto ficam nas fontes locais. Conferir `python3 .hawks/check.py` antes da revisão.
