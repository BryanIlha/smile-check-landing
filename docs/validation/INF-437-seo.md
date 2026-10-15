# INF-437 — SEO das landings Visto e Agendo

Auditoria e implementação em 15/10/2026. Disponibilidade: implementado e validado localmente; integração e produção pendentes. Issue: https://linear.app/infra-hawks/issue/INF-437. A base inclui as novidades por produto da INF-413, ainda pendentes de publicação conjunta.

## Avaliação e prioridades

A indexação efetiva é desconhecida sem Search Console. As bases públicas tinham falhas corrigíveis de rastreamento, conteúdo inicial e URLs. A pontuação automática de SEO já era 100 no laboratório, mesmo com esses problemas; ela não substitui a auditoria HTTP e de código.

| Prioridade / impacto | Evidência pública antes da mudança | Correção e validação |
| --- | --- | --- |
| P1 / alto — conteúdo inicial Visto | GET /: 200, HTML de 1.014 bytes sem H1; conteúdo aparece no browser após JS. | Pré-renderização no build e hidratação React. H1, descrição do produto, contato e links presentes e legíveis sem JS; árvore hidratada sem erros. |
| P1 / alto — destino de entrada Visto | Três links renderizados apontavam para http://localhost:5174/login. | Padrão https://app.visto.hawksbi.com.br/login, domínio já documentado no projeto. HTTP 200 e formulário com campo de senha observados no browser, sem autenticar ou transmitir dados. Override por ambiente preservado. |
| P1 / médio — soft 404 nos dois sites | Endereço inexistente retornava 200 e o mesmo HTML da homepage. | 404.html na raiz, com noindex e retorno ao início. Wrangler Pages 4.151.0 confirmou 404 real em ambos; homepage continua 200. Conferir novamente nos domínios após deploy. |
| P2 / médio — descoberta Visto | robots.txt e sitemap.xml retornavam a shell HTML da homepage com 200. Canonical ausente no HTML inicial e renderizado. | Arquivos reais, sitemap com apenas a URL canônica HTTPS e robots referenciando-o. Content-Type text/plain/application/xml confirmado no simulador Pages. |
| P2 / médio — intenção de busca | Títulos priorizavam somente slogans e marca. | Títulos e descrições explícitos: checklists digitais/rotinas operacionais no Visto; agendamento online no Agendo. Apoio visível contextualiza a categoria, preservando headline e identidade. Não há pesquisa de volume ou garantia de posição. |
| P2 / médio — metadados e semântica | Visto sem JSON-LD no DOM; Agendo com SoftwareApplication básico; metadados sociais incompletos. | Canonical, pt-BR, Open Graph, Twitter e grafo WebSite/WebPage/SoftwareApplication/Organization. Sem preço, avaliações ou FAQ inventados. Schema semanticamente validado no DOM e JSON; teste externo de rich results não foi concluído e não há promessa de resultado enriquecido. |
| P2 / médio — leitura e carregamento | Visto dependia do CSS externo Google Fonts; contraste secundário 4,11:1; H1 pulava para H3 na ilustração. Agendo tinha contraste transitório na ficha animada. | Instrument Sans original local, variável e licenciada; preload, font-display swap; texto secundário mais escuro; título da ilustração como parágrafo; texto do hero permanece visível durante entrada e rotação. Agendo preserva texto opaco na ficha. Headings e contraste conferidos no browser/Lighthouse. |

## Conteúdo e arquitetura

Uma homepage canônica por produto. Visto: foco em checklists digitais, rotinas por setor/turno, temperaturas, pendências e correções. Agendo: foco em agendamento online, escolha do cliente e aprovação do negócio. Esses termos vêm das capacidades e demonstrações existentes, sem promessas de funcionalidades futuras.

As notícias continuam em hawksbi.com.br/blog/, com filtro por produto e links rastreáveis a partir das landings. O artigo completo tem uma única fonte e URL no blog central. Evitar cópias de artigos em subdomínios e páginas quase iguais para variações de palavras-chave. Patch notes precisam explicar mudanças reais e disponibilidade, conforme o registro editorial separado.

Próximos conteúdos úteis: guias demonstrados de rotinas/checklists e aprovação de pedidos, acompanhados de capturas reais autorizadas; cada artigo deve apontar para o produto pertinente. Cases, resultados e depoimentos só entram com evidência e autorização. Contato comercial e assinatura Hawks existentes foram preservados.

## Validação

- Build/tipos do Visto; tipos, lint, testes existentes e build do monorepo Agendo aprovados. A mudança não altera backend, banco, autenticação ou integrações operacionais.
- Seis testes e2e da landing Agendo aprovados: aprovação explícita em 360/390/768/1440 px, pausa/motion e menu/teclado/erro de imagem/zoom 200%. O seletor do teste de texto longo passou a nomear a tagline.
- Browser em 320/390/768/1440 px: um H1, canonical oficial, grafo JSON-LD, sete imagens por página com URLs existentes, ausência de overflow e links locais; leitura sem JS e hidratação sem erro.
- npm run check:seo (na pasta da landing) confere o artefato final, links/assets locais, canonical, HTML pré-renderizado, schema, robots, sitemap e documento 404. HTTP 404 exige a validação de hospedagem complementar.
- Wrangler Pages local, com runtime atual e compatibilidade 2026-10-12: /, /robots.txt, /sitemap.xml retornam 200 com tipos corretos e URL ausente retorna 404/noindex nos dois sites. Nenhuma publicação remota foi feita por esse teste.
- Integridade Hawks e diff conferidos. Impeccable aplicado preservando a identidade. O detector do Visto sinaliza Instrument Sans como fonte recorrente; a fonte é uma decisão de marca fixada e foi preservada. No Agendo, os avisos são consultivos e preexistentes de tokens/tamanhos.
- Lighthouse 13.5.0, mobile 390×844, RTT simulado 150 ms, CPU 4× e cache frio, três execuções por versão. Dados de laboratório locais não equivalem a Core Web Vitals reais; números e dispersão constam na evidência de desempenho. A prévia não reproduz compressão/CDN de produção. A adaptação do servidor local para conexões HTTP persistentes impede atribuir causalidade precisa à diferença entre rodadas.

## Publicação e próximos passos

1. Revisar/integrar a INF-413 e esta implementação, mantendo os projetos/domínios existentes. Não substituir a configuração de Functions do site central por upload de arquivos estáticos: o formulário de contato depende dela.
2. Publicação autorizada por Bruno, mas Wrangler informa ausência de autenticação Cloudflare. A tentativa de login pelo navegador embutido falhou por sessão/CSRF; é necessário autenticar o acesso de deploy. PRs também continuam pendentes; formulário de criação não equivale a PR criada. Não marcar Done ou disponibilidade publicada sem evidência.
3. Após o deploy, confirmar título/canonical/HTML inicial, login, feeds públicos/CORS, robots/sitemap e 404 nos domínios oficiais. Registrar SHA/deployment e caminho de rollback para a versão anterior.
4. Verificar a propriedade dos domínios no Google Search Console, enviar cada sitemap e usar inspeção da homepage. Consultar cobertura, consultas e páginas nas posições 8–20 quando houver dados. O usuário não sabe se as propriedades já estão cadastradas; nenhum dado privado foi presumido.
5. Medir LCP, INP e CLS reais após publicação com Search Console/CrUX quando houver amostra. LCP local ainda exige atenção; não declarar CWV aprovado nem inferir INP de TBT. Priorizar eventuais gargalos pelo resultado servido em produção.

## Sincronização, risco e recuperação

Linear: INF-437 registra execução e limitações. Núcleo Hawks: nenhuma norma comum mudou, logo não há nova versão a propagar. Documentos locais: README, validação e registro editorial atualizados; DESIGN do Visto explicita a fonte local e o contraste. Derivados: robots/sitemap/404/schema e HTML gerados pelo build. Não foi criado post ou automação semanal.

Risco principal: comportamento do build/prerender e a configuração efetiva do host. A homepage mantém as mesmas interações e a demonstração segue local. Reversão por commit/deployment anterior, preservando o projeto e as variáveis de produção. Worktrees retidas até revisão, integração e validação pública; removê-las somente depois de preservar commits e evidências. Estado editorial permanece pendente.
