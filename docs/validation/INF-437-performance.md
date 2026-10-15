# INF-437 — evidência de desempenho local

Data: 15/10/2026. Lighthouse 13.5.0, Chromium do Playwright, mobile 390×844 DPR 1, simulação de RTT 150 ms, rede 1638,4 kbps e CPU 4×, cache frio. Três execuções em cada versão. Tabela: mediana (mínimo–máximo). As capturas iniciais do DOM e os arquivos JSON brutos estão no pacote local da auditoria.

| Site | Versão | LCP, s | CLS | TBT, ms | Performance, /100 |
| --- | --- | --- | --- | --- | --- |
| Visto | Antes | 4.19 (3.75–4.23) | 0.00 (0.00–0.00) | 89.00 (51.50–735.00) | 75.00 (64.00–77.00) |
| Visto | Depois | 3.69 (3.36–3.88) | 0.00 (0.00–0.00) | 163.83 (10.50–230.71) | 81.00 (78.00–87.00) |
| Agendo | Antes | 3.91 (3.85–3.92) | 0.00 (0.00–0.00) | 87.00 (47.00–102.50) | 85.00 (84.00–85.00) |
| Agendo | Depois | 3.67 (3.61–3.68) | 0.00 (0.00–0.00) | 119.00 (109.50–186.50) | 84.00 (84.00–85.00) |

O antes usa o código aprovado da INF-413; o depois inclui a INF-437. SEO automatizado permaneceu 100/100; esse resultado sozinho não detectava a shell de Visto, o conteúdo errado em robots/sitemap nem soft 404s. No depois, acessibilidade e boas práticas retornaram 100 nas três execuções de ambos os sites. Isso é resultado da suíte automática, sem certificação de acessibilidade integral.

As rodadas intermediárias revelaram regressão local do Agendo (LCP próximo de 6 s em parte das execuções); a revisão identificou a transferência desproporcional da marca e substituiu-a por um derivado fiel de 31 KB. A última rodada apresentada usa esse artefato final; execuções intermediárias não foram descartadas do pacote de evidências.

Limites: laboratório local sem compressão/CDN de produção, variação de CPU da máquina e prévia de desenvolvimento. O servidor da prévia foi ajustado para HTTP persistente durante a validação funcional, portanto diferenças entre antes/depois são indicativas e não isolam causalidade. Não há alegação de melhora percentual, medição real de INP ou aprovação de Core Web Vitals. Ambos os LCP locais ainda excedem 2,5 s. Após publicar, medir no domínio oficial e consultar dados de campo do Search Console/CrUX quando houver amostra. TBT não substitui INP.

Economia verificável em bytes: Agendo, logo 355.784 → 31.098 bytes; favicon 2.644 bytes. PNG original preservado. Visto, fonte Instrument Sans variável servida localmente com preload, eliminando a dependência do CSS Google Fonts da cadeia inicial.
