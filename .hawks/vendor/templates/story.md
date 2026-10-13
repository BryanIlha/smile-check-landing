# História: <resultado observável>

## Problema e contexto
Quem enfrenta o problema, o que acontece e quais fontes/versões comprovam?

## Resultado
O que a pessoa ou sistema conseguirá fazer?

## Escopo / fora do escopo
Mudança delimitada e exclusões necessárias.

## Critérios de aceite
- [ ] Dado <contexto>, quando <ação>, então <resultado verificável>.
- [ ] Caso negativo ou recuperação proporcional ao risco.

## Dependências e decisões
IDs de dependências reais, acesso/ambiente, decisões indispensáveis. Declarar nenhuma quando confirmado.

## Implementação e validação
Contrato local e versão Hawks, PR/branch, comandos pelo contrato (não duplicar), evidências exigidas e publicação aplicável ou justificadamente dispensada.

## Revisão da história
Revisor/executor, data, suficiente ou lacunas, complexidade 0–3 e risco independente.

## Responsabilidade / datas
Responsável confirmado ou a definir; prazo acordado ou não definido. Não inferir pessoa pelo criador da issue.

## Entrega / aceite
SHA atual, revisão, testes, integração, release servida, rollback, pendências e próxima ação. Preencher somente o que ocorreu.

## Capacidades e ciclo local
- Catálogo/skills aplicáveis lidos; operação MCP, disponibilidade, limitação e fallback.
- Execução existente pesquisada; branch e worktree próprias, base e caminho local registrados sem caminhos pessoais nas regras compartilhadas.
- Encerramento: remoto/integração/aceite conferidos, arquivos importantes preservados; worktree removida pelo Git ou retenção justificada com condição de remoção.

## Referências e capacidade de execução
Versão/commit/digest das fontes externas; impacto em contratos, fixtures, diagnóstico e guardas. Não usar latest como contrato. Decisões de produto/segurança indispensáveis precisam estar resolvidas; efeitos externos exigem alvo/ambiente e autorização vigentes.

## Rollout e recuperação
Como ativar, observar e interromper/reverter efeitos; não aplicável somente com justificativa. Critérios negativos de tenant/autorização/idempotência/resultado ambíguo conforme risco.
