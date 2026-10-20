# Manual central e descoberta das regras

`BZuller/hawks-standards` é a fonte versionada de manutenção. `standards/` contém o processo comum; `projects/<id>/` reúne conteúdo completo de cada produto/superfície e as fontes datadas. Design, domínio e contratos específicos não viram regras globais. Consulta/busca pode usar Galáxia ou outro leitor; nenhum frontend é necessário para a autoridade do Markdown.

## Ordem e escopo

1. No início e em cada retomada, consultar issue/comentários, manifesto local, origem, integração e operação relevantes. Procurar execução existente antes de criar worktree.
2. Executar `python3 .hawks/read.py --phase <fase>` e ler o conteúdo apresentado e os anexos pertinentes. O leitor verifica a integridade do pacote e informa versão/commit efetivamente lidos e a main central observada. Não usa checkout global compartilhado nem altera o pin.
3. Antes de integrar/publicar, repetir com `--critical`; main desconhecida ou diferente retorna pendência (saída 2). Reconciliar impacto na tarefa e atualizar a adoção de forma versionada quando aplicável; uma exceção admissível precisa da evidência/autoridade exigida pela governança. Não interpretar erro como aprovação.
4. Ler skills aplicáveis, schemas MCP e contratos/runbooks necessários. O leitor não executa skills nem prova que o agente compreendeu anexos, consultou Linear ou cumpriu os critérios.

`--offline` permite leitura do pacote fixado, com atualização central explicitamente desconhecida; não libera ação crítica por padrão. `--document <caminho>` lê um anexo do manual adotado após a mesma verificação. A diferença de SHA não explica sozinha o impacto; consultar o diff e a natureza da mudança. Não trocar regras silenciosamente no meio de uma tarefa.

## Adoção em etapas

A adoção legada conserva PRODUCT/DESIGN/contrato locais. Toda adoção exige que o candidato central já pertença à main remota integrada e tenha origem oficial. O modo `tools/adopt.py <worktree> --project-manual <id>` inclui o recorte específico completo no pacote gerado e exige reconciliação semântica revisada; mudanças nas entradas locais desde a coleta impedem substituição. Adoção é feita na branch/worktree da história, com origin correspondente, diff/revisão/checks e integração próprios. A fonte de adoção deve estar limpa e comprometida; não escolher automaticamente branch operacional pela branch default.

O pacote `.hawks/vendor` é espelho gerado e fixado, útil offline; não é outra fonte editável. Cada consumidor contém apenas o recorte pertinente, além das regras comuns. A exportação usa somente arquivos versionados de uma fonte central limpa; arquivos ignorados/locais não entram no pacote. O lock inclui leitor, fontes e entradas. AGENTS e prompts curtos dirigem a leitura; comandos específicos e regras mais fortes continuam nos contratos de produto. Provar funcionamento das ferramentas/máquinas afetadas antes de retirar qualquer entrada exigida por elas.

Quando o recorte específico tiver revisão documental registrada em `registry/manual-reviews.json`, suas entradas atuais são CONTEXT, PRODUCT, DESIGN e CONTRACT. `sources/` conserva os textos integrais e sua procedência; história/proposta permanece distinta de norma. A revisão vincula commit e hashes das fontes e dos textos reconciliados. Mudança nesses conteúdos invalida a revisão afetada; o importador recusa ativação automática ou revisão incompleta.

PRODUCT.md, DESIGN.md e docs/project-workflow.md nas posições locais requeridas por ferramentas podem ser **espelhos gerados** dessas entradas centrais. Os links relativos são adaptados, o frontmatter existente permanece no início e o verificador compara os espelhos com a fonte fixada. Não editar esses espelhos para alterar regra: atualizar a fonte central e propagar. A adoção confere arquivos locais, templates/prompts anteriores, destinos, links e symlinks antes de escrever; rejeição desse preflight preserva o consumidor. Isso não equivale a transação contra falha de disco nem prova semântica/operacional.

O índice local de autoridade deve explicar esses espelhos e os anexos que permanecem em transição. Não retirar sidecars, ESTETICA, blocos de framework, runbooks ou histórico porque a nova entrada já existe. A disponibilidade e a descoberta reais pelas ferramentas/máquinas continuam critérios próprios.

## Transferência e retirada

`projects/<id>/manifest.json` registra origem, linha, commit, hashes do texto original e central, classificação e condição de retirada. README Markdown é uma visão gerada do mesmo metadado; conteúdo essencial dos documentos está em `.md`. `tools/build_project_manual.py` importa texto completo; links não transferidos apontam à revisão original. Não transforma instruções antigas, propostas ou provas de outra revisão em normas atuais. Revisão semântica/conflitos devem ser resolvidos antes de ativar a entrada do consumidor.

Só retirar uma duplicata editável quando fonte central integrada e adoção do consumidor integrada/testada a substituírem de fato, sem perda de conteúdo, referências, descoberta por ferramentas ou trabalho concorrente. Antes disso, manter a cópia como transição e registrar quem edita/qual origem prevalece; conflito bloqueia somente a ação dependente. Não apagar contratos, design, domínio, runbooks, decisões, histórico ou arquivos exigidos por ferramentas por semelhança de extensão/nome.

Nenhuma execução em computador de Bryan foi provada nesta coleta. Os textos importados mantêm datas e procedência, e os consumidores permanecem não migrados até evidência individual. Bruno cancelou o uso de Onyx e Obsidian em 20/10; nenhum deles é dependência desta entrega. Não implantar essas ferramentas nem criar outra autoridade de processo. Disponibilidade de índice/busca não comprova adoção nem autoriza mutação nos servidores.
