# Perfil aplicativo — 1.2.0

Registrar público, entidades, jornadas, invariantes e limites em PRODUCT. Declarar explicitamente quais capacidades existem: autenticação, organizações, papéis, pagamentos, jobs, offline, integrações. Ausente não significa pendente obrigatório.

Reutilizar estrutura, componentes e contratos locais. APIs e erros seguem schemas; autorização é verificada no servidor. Quando houver tenant, testar isolamento, revogação, storage e jobs. Quando houver offline, distinguir rascunho local de persistência aceita. Mutação e reprocessamento preservam autoria, histórico, idempotência e recuperação.

Novo aplicativo começa com a menor jornada completa, configuração documentada, testes relevantes e runbook. Não criar auth, billing ou arquitetura distribuída por padrão. Evolução mantém migrations e interfaces compatíveis ou documenta a transição.

Todo projeto deste perfil adota [catálogo Hawks](../standards/toolkit.md) e [worktrees/encerramento](../standards/worktrees.md). Aplicar capacidades conforme o escopo; não impor módulos de outro produto.
