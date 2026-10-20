<!-- hawks:manual-discovery:start -->
## Entrada vigente da INF-464

Processo comum e requisitos específicos são carregados por `python3 .hawks/read.py --phase <fase>` no início/retomada; antes de integrar/publicar, usar `--critical`. Versão/commit e main observada são explícitos, sem atualização silenciosa. O [contexto do produto](../.hawks/vendor/projects/visto-landing/CONTEXT.md) resolve precedência e escopo. PRODUCT.md, DESIGN.md e docs/project-workflow.md são espelhos gerados desse recorte, verificados pelo lock; alterações são feitas na fonte central e propagadas.

Fontes integrais/proveniência: `.hawks/vendor/projects/visto-landing/sources/`. Anexos, runbooks, decisões, validações e blocos de framework locais permanecem. Os registros anteriores abaixo mantêm suas datas; não redefinem o pin da tarefa nem provam disponibilidade atual. Não retirar fontes requeridas por ferramentas sem substituição integrada/testada, inclusive nas máquinas afetadas.
<!-- hawks:manual-discovery:end -->

# Mapa documental — smile-check-landing

## Autoridades vigentes

| Assunto | Fonte |
|---|---|
| Processo/qualidade/entrega | [.hawks/vendor/standards](../.hawks/vendor/standards/governance.md), gerado da fonte central |
| Domínio | [PRODUCT](../PRODUCT.md) e seus anexos |
| Identidade visual | [DESIGN](../DESIGN.md) e anexos explicitamente vinculados |
| Execução local | [project-workflow](project-workflow.md) |
| Prioridade e estado da história | Linear atual; [status](status.md) é fotografia |

## Migração das instruções

O AGENTS anterior está preservado no [commit auditado](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/AGENTS.md). Regras de domínio/visual foram mantidas nas respectivas fontes; parâmetros e guardas no contrato. Templates e processo passam ao núcleo. Blocos de framework gerados permanecem em AGENTS. Mudanças comuns exigem fonte central e propagação; nenhuma norma local pode dispensar os gates.

## Documentos existentes

Índice de caminhos da base auditada. Relatórios, revisões, briefs de história, mocks e fotografias de ambiente têm o escopo/data que registram; não substituem as autoridades acima. Documentos de módulo, arquitetura, segurança e operação continuam aplicáveis como anexos no seu escopo. Conflitos devem ser corrigidos na fonte, sem escolher a alternativa mais permissiva.

- [.impeccable/critique/2026-08-06T17-28-04Z__src-app-tsx.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/.impeccable/critique/2026-08-06T17-28-04Z__src-app-tsx.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
- [.impeccable/critique/2026-08-11T23-15-26Z__src-app-tsx.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/.impeccable/critique/2026-08-11T23-15-26Z__src-app-tsx.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
- [AGENTS.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/AGENTS.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
- [README.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/README.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
- [design/audits/visto-landing-technical-audit.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/design/audits/visto-landing-technical-audit.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
- [design/audits/visto-landing.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/design/audits/visto-landing.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
- [docs/project-workflow.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/docs/project-workflow.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
- [docs/status.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/docs/status.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
- [docs/visto-como-funciona.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/docs/visto-como-funciona.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
- [public/assets/visto/README.md](https://github.com/BryanIlha/smile-check-landing/blob/0bbf8b3135652b27e183680b0fd540539ae92fd3/public/assets/visto/README.md) — versão anterior à consolidação; consultar o mesmo caminho atual quando existir.
