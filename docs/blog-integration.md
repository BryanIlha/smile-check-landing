# Blog por produto — INF-413, 13/10/2026

Fonte pública única: `hawks_site/src/lib/editorial.ts`. A tipagem admite `kind: news | patch-notes`, `editorialStatus: published | draft` e associação `products` opcional. Artigos draft são removidos da exportação pública, rotas e feeds. Post usa URL canônica no blog central.

Site central: build gera `dist/blog/feed.json` e `dist/blog/feeds/<produto>.json` automaticamente, sem manter cópias de conteúdo nos produtos. `_headers` libera somente leitura pública dos feeds para as landings. `?produto=visto|agendo|conexo` escolhe filtro no blog; filtro escolhido atualiza a URL.

Landings: `ProductNews` lê o feed HTTPS correspondente ao produto, valida schema/campos/URL/produto, ordena por data e mostra todos os artigos do feed. Abort em 15 segundos; erro, retry e vazio explícitos. Texto remoto é renderizado como texto React; não inserir HTML. Visto e Agendo têm dois artigos cada, Conexo nenhum em 13/10/2026.

## Publicação e conferência

1. Publicar primeiro o site central construído a partir da branch desta entrega, incluindo JSON e `_headers`; confirmar GET dos feeds e CORS no domínio oficial, comparar itens com os artigos publicados.
2. Publicar as landings a partir de seus builds; conferir em browser nos domínios oficiais que só recebem seus produtos, incluindo estado de falha e links.
3. Atualizar a nota `docs/releases/entries/inf-413-visto-blog.md` com data/evidência de produção. Só então incluir a entrega em patch notes de versão disponível.

Branch/PR não prova publicação. Agendo inclui a fonte da landing que já estava publicada e ainda não estava versionada na main: a cópia aprovada foi preservada em apps/landing e o lock apenas acrescenta esse workspace. Conexo foi validado a partir da fonte remota da branch de adoção; seu transporte Git privado exigiu o conector GitHub, sem alterar credenciais. Os sites podem mostrar erro até o feed central ser publicado; nesse caso o link para o blog continua disponível.

## Matriz de referências

- Linear: INF-413 guarda objetivo, evidências e pendências.
- Hawks Standards: norma 1.3.0 fixada no manifesto/lock; AGENTS e prompts gerados foram verificados.
- Produto: registra mudança editorial e disponibilidade nesta documentação; domínio de agenda, rotinas e atendimento permanece definido em PRODUCT.
- Design: seção de leitura herda fonte, paleta e composição da landing; screenshots desktop/mobile conferidos. Avisos do detector relativos à fonte Instrument Sans aprovada e à documentação antiga de tamanhos são registrados, sem substituir a identidade.
- Galáxia/manuais anteriores: fotografias da adoção 1.2.x; não representam o estado desta 1.3.0. Atualização do mapa depende da integração e deve citar seus commits reais.
