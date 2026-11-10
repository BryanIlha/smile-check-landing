# Progresso mais claro no agendamento de demonstração

- id: inf-569-visto-modal-demonstracao
- products: [visto]
- type: improvement
- editorial_status: pendente
- availability: implementado
- integrated_at: pendente
- released_at: pendente
- issue: https://linear.app/infra-hawks/issue/INF-569
- pull_request: pendente
- commit: pendente
- published_url: pendente
- published_at: pendente
- weekly_post: pendente

## O que mudou

A modal de demonstração passou a mostrar Contato, Negócio e Horário no cabeçalho. Os passos concluídos recebem um visto e a etapa atual acompanha a troca de campos. A confirmação destaca a data e o horário escolhidos.

## Por que ajuda e como usar

Quem abre a modal consegue ver em qual etapa está e o que vem a seguir. Abra “Pedir demonstração” na landing para começar.

## Evidências e limitações

Validação local com o build de produção e Playwright em 320, 375, 768, 1024 e 1440 px, incluindo a preferência de movimento reduzido. Os testes usam horários e reservas simulados. O contrato de agendamento continua no Cockpit.
