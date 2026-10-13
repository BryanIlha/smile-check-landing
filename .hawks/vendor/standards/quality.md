# Qualidade comum e evidências

Uma mesma matriz decide os gates em todos os projetos. Comandos reais, jornadas, dispositivos e ambientes são parâmetros locais, não outro processo.

| Mudança | Prova obrigatória quando aplicável |
|---|---|
| Documentação | Integridade Hawks, diff, referências, comandos citados e coerência. |
| Código/CI | Teste estrutural ou de comportamento proporcional; build/tipos/lint conforme contrato. Registrar falhas preexistentes. |
| UI | Skill Impeccable lida e aplicada; DESIGN preservado; browser, teclado/foco, contraste, erro/vazio/carregamento, conteúdo longo e mobile/desktop. Playwright e revisão independente quando exigidos pelo projeto/skill. |
| API/domínio | Resultado e caso negativo; contrato, persistência, concorrência/idempotência pertinentes. |
| Autorização | Acesso permitido e negado; isolamento entre tenants/unidades/papéis segundo o modelo real. Não usar papel que bypassa o controle para provar isolamento. |
| Dados/migration | Migration nova/reproduzível, integridade, ambiente isolado e recuperação; não reescrever migrations aplicadas nem resetar remoto. |
| Integração/n8n | MCP suficiente, contrato/versão, erro/reexecução, idempotência e prova do efeito; fixture não prova entrega real. |
| Publicação | Destino, SHA, CI e health/fluxo afetado observados. Reversão ou recuperação documentada. |

Antes de implementar, registrar quais linhas se aplicam e como serão comprovadas. Omitir uma linha exige motivo relacionado ao escopo, não conveniência. A mudança deve passar pelos gates do contrato local sem inventar scripts.

Não escrever testes que somente reproduzem a implementação. Mudança documental não exige build do produto por ritual; mudança no verificador/CI exige testes do próprio mecanismo, incluindo falhas.

Revisão da história confirma prontidão; revisão da PR confirma comportamento, riscos, fontes e evidência do SHA atual. Alteração após review invalida a evidência afetada. Divergência de regra precisa ser resolvida na fonte apropriada, preservando o controle mais seguro enquanto houver incerteza.
