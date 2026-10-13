# Estado da adoção — smile-check-landing

11/10/2026. Base documental: [commit ea15d92](https://github.com/BryanIlha/smile-check-landing/commit/ea15d92095d3f2ed57e1fae1b7277ea6042f6832). Adoção Hawks 1.1.0 preparada em branch própria; integração/aceite pendentes. Sem alteração de runtime, dados, automações ou publicação. Esta leitura não comprova estado servido nem validação autenticada do produto.

Catálogo e ciclo de worktrees passam a ser exigidos pela proposta de adoção. Configuração é por cliente: Linear/n8n/GitHub responderam nesta conversa; Coolify não tem MCP conectado; o novo MCP Hawks requer credenciais próprias para Linear/OpenAI. Responsável humano e próxima data de configuração a definir em INF-392. Limpeza da worktree pendente de integração/aceite e preservação dos arquivos.


## Revalidação documental — 12/10/2026 (INF-399)

A fotografia de 11/10/2026 acima é histórica. O manifesto vigente fixa Hawks 1.2.1 em `75710d621022e3333ab632e3fa2c3423b09fcc74`, perfil landing. A branch remota `codex/inf-392-workflow` foi revalidada em `fc4b247407791ee69631b171c8be7864ca20ca4d`, sobre `main` em `ea15d92095d3f2ed57e1fae1b7277ea6042f6832`. Os SHAs do snapshot documental local não representam o histórico remoto.

Os seis prompts de entrada e seus correspondentes no pacote foram revisados. O contrato e o README passam a indicar 1.2.1; produto, identidade visual e históricos datados permanecem preservados. Os títulos 1.2.0 ainda existentes em partes do núcleo pertencem ao conteúdo do pin: sua harmonização deve ocorrer na fonte central, com versão e propagação, sem editar o vendor manualmente.

O check `verify` do workflow Hawks e o check Cloudflare Pages passaram no commit remoto `fc4b247`; isso não comprova validação dos commits posteriores. Em 12/10/2026, a API de branches retornou `protected=false` para `main`, rulesets retornou lista vazia e a consulta detalhada da proteção retornou 403 (`Resource not accessible by integration`). Tornar o check Hawks obrigatório e restringir bypass depende de acesso administrativo autorizado, ainda não disponível por esse conector.

PR, checks do próximo SHA, integração e aceite continuam pendentes nesta fotografia. A [INF-399](https://linear.app/infra-hawks/issue/INF-399) concentra o estado atual e as evidências posteriores. A worktree deve ser mantida até persistência remota, integração, validação e conferência dos arquivos locais. Esta correção documental não requer publicação manual do runtime.

A coordenação INF-392 deve reconciliar `registry/projects.json`, `registry/adoption-1.2.1.json` e a captura da Galáxia com o resultado final da INF-399. A captura anterior não comprova a conclusão desta adoção; a fonte central e seus derivados não são editados por este executor.
