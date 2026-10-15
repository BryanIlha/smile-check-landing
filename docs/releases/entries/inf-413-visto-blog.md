# Novidades do Visto na landing

- id: inf-413-visto-blog
- products: [visto]
- type: feature
- editorial_status: pendente
- availability: implementado
- integrated_at: pendente
- released_at: pendente
- issue: https://linear.app/infra-hawks/issue/INF-413
- pull_request: pendente
- commit: pendente
- published_url: pendente
- published_at: pendente
- weekly_post: pendente

## O que mudou
O blog central publica metadados dos artigos em feeds públicos por produto. As landings Visto, Agendo e Conexo listam os respectivos posts, mantendo título, resumo, data e indicação de disponibilidade. Artigos continuam no site central; uma atualização da fonte alimenta todas as listas.

## Por que ajuda
O visitante acompanha a evolução do produto na própria landing e abre o artigo completo no blog Hawks. Erro de rede oferece nova tentativa e o blog filtrado; ausência de conteúdo fica explícita.

## Evidências e limitações
Builds e checks proporcionais passaram. Testes de parsing do feed, renderização e browser confirmaram filtros, loading/erro/retry/vazio, 320/390/768/1440 px e movimento reduzido. Nos testes locais, o browser recebeu o feed gerado pelo site central via interceptação de rede; publicação do endpoint/CORS e disponibilização nos domínios oficiais ainda são pendentes. Nenhum post semanal foi publicado.
