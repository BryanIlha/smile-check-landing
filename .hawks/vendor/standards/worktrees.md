# Worktrees e encerramento — Hawks 1.2.0

Obrigatório em aplicativos, landing pages, hubs e ferramentas. Toda implementação ou edição versionada usa branch e worktree próprias da história. O checkout principal é referência/integração e permanece sem desenvolvimento. Clone separado, branch isolada ou snapshot sozinho não substituem uma worktree Git.

## Preparar ou retomar

1. Ler a issue, catálogo de capacidades, AGENTS e contrato local. Confirmar integração real e autorizações.
2. Consultar issue/PRs, branches locais/remotas e `git worktree list --porcelain`. Se existir execução da mesma história, retomar a worktree correta; não abrir outra branch ou duplicar a PR. Estado divergente exige reconciliação, sem reset do trabalho alheio.
3. Configuração portátil: `HAWKS_REPOS_ROOT` contém referências locais; `HAWKS_WORKTREE_ROOT` é a raiz escolhida pelo operador, fora do checkout principal. Caminho comum: `${HAWKS_WORKTREE_ROOT}/<repo>/inf-<número>`. Não gravar caminhos pessoais no repositório. Registrar caminho efetivamente usado no registro local da tarefa.
4. Branch nova padrão: `codex/inf-<número>-<resumo>`. Preservar convenção local mais específica: Visto usa exatamente `redesign/inf-<número>`. Branch já em execução é retomada com seu nome existente, registrado na issue.
5. Atualizar refs sem descartar arquivos; usar `git worktree add -b <branch> <caminho> <ref-confirmada>` para trabalho novo, ou `git worktree add <caminho> <branch-existente>` se a branch ainda não estiver em outra worktree. Nunca `--force` para contornar checkout ocupado.
6. Para repositório realmente novo, inicializar somente metadados Git e um commit vazio de bootstrap; criar worktree antes de adicionar conteúdo versionado. Não criar aplicação no checkout principal para movê-la depois.

Uma história transversal pode ter uma worktree/PR por repositório. Subagentes que editam usam áreas exclusivas e seguem as regras de delegação da skill/cliente; pareceres somente leitura não exigem cópia de implementação. Preservar helpers locais suportados, como os scripts de worktree do Conexo, quando aplicáveis.

## Conferir durante execução

Antes da primeira edição e na revisão: verificar `git rev-parse --show-toplevel`, branch e registro em `git worktree list`. Confirmar que o caminho não é o checkout principal. Carregar configurações locais sem copiá-las para Git. Registrar em qual worktree foi validado o SHA. Arquivos de ambiente, caches e resultados locais não são descartáveis por estarem ignorados.

## Encerramento obrigatório

A tarefa inclui remover sua worktree quando a entrega estiver concluída e preservada. Antes de remover:

- Confirmar commits persistidos no remoto e vínculo issue/PR. Conferir integração na base correta, incluindo squash/cherry-pick quando houver, e validações/aceite requeridos. Um teste verde ou push isolado não bastam.
- Conferir `git status --porcelain --untracked-files=all`, inventário dos ignorados e arquivos importantes fora do Git. Preservar segredos/configurações no destino local apropriado e artefatos necessários em armazenamento durável. Nunca exibir seu conteúdo no relatório.
- Parar apenas processos próprios e tirar qualquer configuração de cliente que ainda aponte para a worktree; instalação MCP operacional deve usar destino durável. Preservar configurações e dados de outras sessões.
- A partir de outro diretório, usar o helper local suportado ou `git worktree remove <caminho-exato>`, sem `--force`. Conferir `git worktree list`. `git worktree prune --dry-run` é diagnóstico; não podar registros de outras tarefas ou discos temporariamente desconectados.
- Preservar branches necessárias e refs de versões adotadas. Não usar remoção recursiva de diretórios ou exclusão global de branches/worktrees como atalho.

Se um gate impedir encerramento, manter o recurso e registrar issue, repositório, branch, caminho local, motivo concreto, evidência, próxima ação e condição exata para remoção. Responsável humano desconhecido permanece a definir. A pendência precisa aparecer no relatório final e no Linear; não declarar limpeza concluída. Agendamento de limpeza futura exige solicitação, sem monitor automático implícito.

Critério de conclusão: limpeza comprovada **ou** retenção justificada com condição de remoção; integração e aceite continuam obrigatórios para Done. Nunca remover worktree de entrega não integrada só para satisfazer um indicador de limpeza.

## Verificação executável

Antes de editar ou revisar, executar `node <kit>/scripts/check-worktree.mjs <worktree> <branch-esperada>`. O comando somente lê Git: recusa checkout principal, branch divergente e worktree sem registro. Retorna SHA e identidade local; não autoriza limpeza nem comprova integração. O teste automatizado exercita criação/remoção suportadas em fixture descartável e preservação do checkout de referência. Referência: [git-worktree](https://git-scm.com/docs/git-worktree).
