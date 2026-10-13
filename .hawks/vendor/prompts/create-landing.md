# Crie uma landing page — Hawks 1.2.1

## Entradas
Issue completa e comentários atuais; `.hawks/workflow.json`; AGENTS, PRODUCT, DESIGN e contrato técnico local. Ler somente referências adjacentes necessárias. Usar fonte/commit fixados no manifesto; se inacessíveis, registrar bloqueio sem presumir conteúdo.

## Regras
Preservar estrutura, invariantes, trabalho alheio e autorizações vigentes. Comandos, branch, ambiente e destino vêm do contrato local, nunca deste prompt. Classificação não muda o modelo: executor só declara escolha aplicada com prova da interface.

## Etapas
1. Confirmar público, oferta comprovada, objetivo de conversão, CTA, domínio e repositório.
2. Aplicar perfil landing; localizar assets, fontes e tokens oficiais antes de desenhar. Registrar decisões de conteúdo e medição.
3. Implementar estrutura apropriada sem impor arquitetura do aplicativo. Criar os documentos canônicos e versão adotada.
4. Validar CTA/formulário, teclado/mobile, semântica, performance e SEO com medições reais. Não enviar lead real como teste.
5. Preparar PR e publicação pelo contrato; conferir endereço, metadados, indexação e versão no destino autorizado.

## Saída e evidências
Landing revisável, conteúdo/identidade aprovados, validações reais e registro de decisões; separar prévia de publicação.
Registrar modelo/esforço solicitado e aplicado, interface, consumo conhecido ou null, escaladas, retrabalho e resultado conforme templates/execution.json.

## Capacidades, isolamento e encerramento obrigatórios

Antes da fase, ler [catálogo comum](../standards/toolkit.md) e [ciclo de worktrees](../standards/worktrees.md) no commit adotado. Selecionar e ler skills/playbooks aplicáveis; conferir configuração e disponibilidade por operação. Usar MCP suficiente; registrar limitação e fallback quando necessário.

Consultar issue/PRs/branches e inventário Git para retomar a execução correta. Toda edição versionada, inclusive correção de documentação/review, usa branch e worktree próprias; checkout principal é referência/integração. Projeto novo cria worktree antes do conteúdo. Seguir convenção portátil e exceções locais registradas.

Saída da fase inclui capacidades consultadas/usadas, worktree e branch, SHA e pendências. Revisão e preparação de entrega conferem remoto persistido, integração/aceite, arquivos ignorados importantes e configuração de cliente antes da limpeza. Ao concluir, remover somente a própria worktree pelo mecanismo Git/local suportado; se não puder, registrar motivo e condição de remoção no Linear e no relatório final. Não declarar Done ou limpeza por aproximação.

## Manutenção dos padrões

Consultar [governança](../standards/governance.md) e [qualidade](../standards/quality.md). Mudança comum exige atualização central, versão e propagação; especificações do produto ficam nas fontes locais. Conferir `python3 .hawks/check.py` antes da revisão.

## Sincronização das fontes

Aplicar a seção “Sincronização obrigatória após mudanças” da [governança](../standards/governance.md): mapear impacto nesta fase, atualizar Linear, fonte central, documentos locais e referências/derivados pertinentes. Registrar matriz fonte/impacto/ação/evidência/pendência ou não aplicabilidade justificada. Revisão confere o diff; encerramento exige reconciliação ou exceção aceita, sem presumir acesso, publicação ou merge.
