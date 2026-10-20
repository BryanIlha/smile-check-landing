#!/usr/bin/env python3
"""Read the locked local manual; compare main without changing task rules.

No checkout, global standards clone, secret output, or automatic update.
Exit 2 means a critical context check is unresolved, not an adopted new version.
"""
import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

REMOTE = 'https://github.com/BZuller/hawks-standards.git'
PHASES = ('triage','implement','review','build-deploy','create-app','create-landing')

def current_main():
    try:
        r = subprocess.run(['git','ls-remote',REMOTE,'refs/heads/main'],capture_output=True,text=True,timeout=20,env=dict(os.environ,GIT_TERMINAL_PROMPT='0'))
        value = r.stdout.split()[0] if r.returncode == 0 and r.stdout.split() else ''
        return value if re.fullmatch(r'[0-9a-f]{40}',value) else None
    except (OSError,subprocess.TimeoutExpired):
        return None

def context(root, phase, latest, critical=False, document=None):
    # Verify every locked byte before displaying a file as task authority.
    from check import check, safe
    errors=check(root)
    if errors: raise ValueError('Local context failed integrity: '+'; '.join(errors))
    m=json.loads((root/'.hawks/workflow.json').read_text())
    pin=m['sourceCommit']
    state='unknown' if latest is None else ('same' if latest==pin else 'different_requires_reconciliation')
    lines=['# Contexto Hawks da tarefa','',f"Projeto: {m['project']}; repositório: {m['repository']}; integração: {m['integrationBranch']}.",
           f"Regras efetivamente lidas: versão {m['version']}, commit {pin}.",f"main central observada: {latest or 'indisponível'}; comparação: {state}.",
           'Nenhuma regra foi atualizada automaticamente. Diferença exige avaliar impacto e registrar decisão antes da ação dependente; igualdade não comprova adequação semântica da tarefa.','']
    vendor=root/'.hawks/vendor'
    paths=['standards/governance.md','standards/manual-and-discovery.md','standards/task-checklist.md','standards/quality.md','standards/delivery.md','standards/worktrees.md','standards/toolkit.md','prompts/'+phase+'.md']
    manual=m.get('manual',{})
    if manual: paths+=['projects/RECONCILIATION.md']
    paths+=manual.get('entrypoints',[])
    if document:
        if document not in manual.get('documents',[])+manual.get('supportingDocuments',[]): raise ValueError('Document not in adopted project manifest')
        paths=[document]
    for rel in dict.fromkeys(paths):
        p=safe(vendor,rel)
        if not p.is_file():raise ValueError('Missing context entry: '+rel)
        lines+=['## '+rel,'',p.read_text(),'']
    if not manual and not document:
        for key in ('product','design','contract'):
            rel=m[key];lines+=['## '+rel,'',safe(root,rel).read_text(),'']
    if manual:
        lines+=['## Anexos disponíveis','']+['- '+p for p in manual.get('documents',[])+manual.get('supportingDocuments',[])]
        lines+=['','Leia anexos pertinentes com --document <caminho>. Snapshot não comprova operação atual. Espelhos locais necessários a ferramentas permanecem preservados até migração validada.']
    return '\n'.join(lines), (2 if critical and state!='same' else 0)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--phase',choices=PHASES,required=True);p.add_argument('--critical',action='store_true');p.add_argument('--document');p.add_argument('--offline',action='store_true');a=p.parse_args()
    try:
        text,code=context(Path(__file__).resolve().parents[1],a.phase,None if a.offline else current_main(),a.critical,a.document)
        print(text);sys.exit(code)
    except (OSError,ValueError,KeyError,TypeError) as exc:
        print('Contexto indisponível: '+str(exc),file=sys.stderr);sys.exit(2)
