# Blog e patch notes semanais — Hawks 1.3.0

Regra solicitada por Bruno em 13/10/2026. Toda feature, melhoria ou fix deve deixar um registro durável no repositório, durante a entrega, para a edição semanal do blog. Aplica-se a todos os projetos; registrar não significa publicar.

## Registrar a cada mudança

Criar ou atualizar `docs/releases/entries/<issue>-<resumo>.md`, usando o [modelo](../templates/release-note.md). Uma entrega transversal tem um registro por produto com a mesma issue e referências cruzadas; commits de uma mesma entrega atualizam o registro existente. Guardar: identificador, produto(s), tipo (`feature`, `improvement`, `fix`), título legível, problema anterior, resultado, benefício/uso, issue/PR/commit, validação, limitações, data de integração e disponibilidade comprovada. Dados desconhecidos ficam pendentes.

Separar disponibilidade (`implementado`, `integrado`, `staging`, `producao`, `revertido`) de estado editorial (`pendente`, `selecionado`, `publicado`, `interno`). A data de produção precisa de evidência; merge ou teste verde não comprova lançamento. Uma mudança revertida é atualizada e retirada da seleção. Itens exclusivamente internos continuam registrados como internos, com motivo; remover detalhes de clientes, credenciais, vulnerabilidades não divulgadas e dados privados da versão pública.

Registro é parte do aceite de feature/fix: revisão confere caminho e conteúdo antes de encerrar a entrega. Documentação, refactor ou infraestrutura que sustentam uma feature/fix entram no mesmo registro, sem fabricar uma notícia para cada commit. Não apagar os registros depois de publicar.

## Consolidar por semana e por produto

Usar semana de segunda a domingo em `America/Sao_Paulo`, identificada pelo intervalo de datas. Preparar `docs/releases/weeks/<inicio>_<fim>-<produto>.md`: título “<Produto>: novidades da semana de <inicio> a <fim>”, resumo, Novidades, Melhorias, Correções e disponibilidade/limitações úteis. Omitir categorias vazias.

Selecionar entregas com benefício público e liberação comprovada naquela semana. Registro antigo que chega à produção agora entra na semana da liberação. Conteúdo de desenvolvimento pode virar notícia separada, claramente identificado como em preparação/validação; não misturar com patch notes de versão disponível. Sem novidades elegíveis, não publicar post vazio.

Agrupar vários fixes pequenos, escrever em português simples com exemplos de uso, explicar o que mudou e por que ajuda. Conferir a fonte real antes de afirmar resultado. Após publicação verificada, marcar os registros com `published_url`, `published_at` e `weekly_post`; um mesmo registro não entra duas vezes no mesmo resumo. Correção posterior atualiza o artigo e a trilha.

A cadência semanal é editorial. Estes MDs não executam agenda, não publicam automaticamente e não autorizam mensagens a terceiros. Agendamento/publicação seguem a instrução da tarefa e o processo existente.

## Blog central e landings

`https://hawksbi.com.br/blog/` concentra notícias e patch notes públicos de todos os produtos. Cada artigo tem slug estável, produto(s), tipo (`news` ou `patch-notes`), data, resumo e disponibilidade explícita. A fonte de conteúdo fica no repositório do site central. Atualizar o artigo uma única vez nessa fonte.

Landings exibem a lista do mesmo conteúdo filtrada por produto: Visto recebe somente Visto; Agendo recebe somente Agendo; Conexo/Ciclo e futuros produtos recebem apenas seus respectivos posts. Todas as notícias relacionadas ao produto são elegíveis, incluindo patch notes. Quando um artigo cobrir vários produtos, o contrato do feed deve suportar essa associação antes de publicar; não deduzir a categoria pelo texto do título.

O site central gera `/blog/feed.json` e feeds `/blog/feeds/<produto>.json`, com metadados públicos e URLs canônicas do central. A lista central aceita `?produto=<id>` para links das landings. Cada landing usa o feed filtrado, mostra todos os itens publicados em ordem de data (paginação quando crescer), preserva disponibilidade e abre o artigo central. Não duplicar manualmente os artigos entre repositórios. Feed não expõe rascunhos editoriais ou registros internos.

Falha de rede ou feed inválido oferece link para o blog central filtrado e nova tentativa; zero artigos mostra estado vazio honesto. Validar produto, campos e URLs do feed; conteúdo remoto não vira HTML executável. A publicação central precisa incluir o feed e CORS de leitura para as landings. Alterar feed versiona o schema e preserva compatibilidade.

## Criar projetos e revisar entregas

Novos projetos recebem esta regra pelos AGENTS/prompts centrais e usam a pasta `docs/releases/entries/` desde a primeira feature/fix. App e landing do mesmo produto compartilham identificador editorial. A PR registra o caminho da nota, a disponibilidade comprovada e as pendências; build/deploy atualiza a disponibilidade, não o estado editorial por inferência.
