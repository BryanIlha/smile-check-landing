# Checklist da tarefa

Aplicação operacional de [governança](governance.md), [entrega](delivery.md), [qualidade](quality.md) e [worktrees](worktrees.md). O agente preenche as provas no registro da tarefa/PR pelo [modelo único](../templates/delivery-evidence.md); não criar estados novos ou relatórios paralelos. Conferir os itens pertinentes, não apenas marcar caixas.

## Início e retomada

- [ ] Identificar pedido, produto/superfícies, critérios, autorizações e resultado que encerra a tarefa. Distinguir documento, integração, homologação e produção.
- [ ] Conferir repositório/origem efetiva, integração@ponta e operação/artefato quando pertinente; comparar diferenças antes de escolher base e destino. Registrar lacuna operacional quando não verificável.
- [ ] Ler AGENTS, manifesto, pacote@commit e contratos relevantes neste chat. Comparar instruções locais/remotas e adoções pertinentes, sem atualização silenciosa de tarefa em curso.
- [ ] Inspecionar alterações/ignorados importantes, branch@SHA, refs datadas, PRs/worktrees e concorrência observável antes de sincronizar. Preservar alterações e retomar execução correta; edição versionada usa worktree, consulta não exige uma.
- [ ] Relacionar critérios a provas/ambientes e fontes afetadas; registrar dependências, capacidade e decisões realmente necessárias. Continuar partes independentes.

Saída: contexto e procedência registrados, diferenças explicadas e próximo passo autorizado. Repetir itens afetados após retomada, troca de máquina/worktree ou mudança relevante; memória de outro chat não prova conferência atual.

## Antes de integrar e novamente antes de publicar

- [ ] Reconsultar pontas, PRs, regras e estado do destino/publicações em curso. Registrar candidato/base e horário; reconciliar preservando entregas concorrentes.
- [ ] Conferir critérios, diff, revisão e checks do candidato atual. Após mudança de base, candidato ou dependência/ambiente pertinente, repetir provas afetadas; ausente/skipped/falha não vale como aprovação.
- [ ] Confirmar destino e autorização vigente, sem pedido repetido desnecessário. Para deploy, ligar artefato validado, serviços/configuração/migrations pertinentes e recuperação ao ambiente.

Saída: ação apta ou impedimento específico. Consulta/proposta que não exige integração/publicação registra não aplicabilidade com motivo.

## Encerramento

- [ ] Comprovar integração no destino, incluindo equivalência quando SHA mudar. Para publicação exigida, observar versão/artefato por serviço e resultado do fluxo; distinguir publicação de ativação e editorial.
- [ ] Conferir conteúdo e estado gravados no Linear, decisões, fontes e matriz de impacto. Registrar feature/fix conforme política editorial existente; blog publicado não é gate artificial do fix.
- [ ] Conferir preservação remota e arquivos importantes; limpar somente recursos próprios pelo mecanismo suportado ou registrar retenção permitida e condição exata. Respeitar requisito local mais forte.
- [ ] Repassar cada obrigação e aceite exigidos; declarar separadamente implementação, validação, integração, publicação e aceite. Não encerrar promessa pendente por abrir outra issue ou concluir um filho do épico.

Se faltar prova, usar “não verificado”; divergência aponta as versões, impacto, autoridade e correção. Bloquear só a ação dependente. Exceção exige aceite admissível, controle compensatório e condição, não dispensa tácita. Nunca presumir verificação no PC de Bryan ou autorização para contatar pessoas/chats.
