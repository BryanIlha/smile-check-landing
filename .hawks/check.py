#!/usr/bin/env python3
"""Offline consumer integrity and generated-entry validation. No network or mutations."""
import hashlib
import json
import re
import sys
from pathlib import Path

PHASES = ('triage', 'implement', 'review', 'build-deploy', 'create-app', 'create-landing')
FRAMEWORK = re.compile(r'<!-- BEGIN:nextjs-agent-rules -->.*?<!-- END:nextjs-agent-rules -->', re.S)

def digest(data):
    return hashlib.sha256(data).hexdigest()

def render(template, values):
    for key, value in values.items():
        template = template.replace('{{' + key + '}}', str(value))
    return template

def safe(root, relative):
    path = root / relative
    if not path.resolve().is_relative_to(root.resolve()):
        raise ValueError('Path outside project: ' + relative)
    return path

def check(root):
    errors = []
    try:
        m = json.loads((root / '.hawks/workflow.json').read_text())
        lock = json.loads((root / '.hawks/lock.json').read_text())
        for key in ('version', 'sourceRepository', 'sourceCommit'):
            if m.get(key) != lock.get(key): errors.append('Manifest/lock mismatch: ' + key)
        if m.get('sourceRepository') != 'BZuller/hawks-standards': errors.append('Unexpected standards source')
        if not re.fullmatch(r'[0-9a-f]{40}', m.get('sourceCommit', '')): errors.append('Pin must be an immutable SHA')
        if m.get('schemaVersion') != 2: errors.append('Expected schemaVersion 2')
        if not re.fullmatch(r'P-INF-\d+', m.get('linearProject', '')): errors.append('Resolve Linear project')
        for key in ('project','repository','integrationBranch','branchTemplate','worktreePathTemplate'):
            if not m.get(key): errors.append('Missing field: ' + key)
        if m.get('worktreeRootEnv') != 'HAWKS_WORKTREE_ROOT': errors.append('Worktree root must be portable')
        if m.get('product') != 'PRODUCT.md' or m.get('design') != 'DESIGN.md': errors.append('Use canonical product/design entries')
        for key in ('product', 'design', 'contract', 'status'):
            if not safe(root, m[key]).is_file(): errors.append('Missing local source: ' + m[key])
        for p in ('docs/documentation-map.md',):
            if not safe(root,p).is_file(): errors.append('Missing local source: ' + p)
        for p, h in lock['files'].items():
            target = safe(root, p)
            if not target.is_file() or digest(target.read_bytes()) != h: errors.append('Generated/shared file changed: ' + p)
        required = {'.hawks/check.py', '.github/workflows/hawks-standards.yml'}
        required |= {'.hawks/vendor/templates/' + p for p in ('AGENTS.md.tmpl','prompt.md.tmpl')}
        required |= {'.hawks/vendor/standards/' + p + '.md' for p in ('hawks','governance','quality','delivery','toolkit','worktrees')}
        required |= {'.hawks/vendor/prompts/' + p + '.md' for p in PHASES}
        missing = required - set(lock.get('files',{}))
        if missing: errors.append('Incomplete lock: ' + ', '.join(sorted(missing)))
        vendor = root / '.hawks/vendor'
        actual = {str(p.relative_to(root)) for p in vendor.rglob('*') if p.is_file()}
        extra = actual - set(lock['files'])
        if extra: errors.append('Untracked vendor files: ' + ', '.join(sorted(extra)))
        values = {'project':m['project'],'contract':m['contract']}
        expected = render((vendor/'templates/AGENTS.md.tmpl').read_text(),values).strip()
        agents = (root/'AGENTS.md').read_text()
        if len(FRAMEWORK.findall(agents)) > 1: errors.append('Duplicate framework block')
        if FRAMEWORK.sub('',agents).strip() != expected: errors.append('AGENTS diverges from central template')
        for phase in PHASES:
            expected = render((vendor/'templates/prompt.md.tmpl').read_text(),dict(values,phase=phase))
            if (root/'prompts'/f'{phase}.md').read_text() != expected: errors.append('Prompt diverges: ' + phase)
        gates = m.get('validation',{})
        if not gates.get('documentation') or not gates.get('functional'): errors.append('Validation mapping required')
        package = root / 'package.json'
        scripts = json.loads(package.read_text()).get('scripts',{}) if package.exists() else {}
        for commands in gates.values():
            if not isinstance(commands,list): errors.append('Validation commands must be arrays'); continue
            for command in commands:
                for script in re.findall(r'\bnpm run ([\w:.-]+)',command):
                    if script not in scripts: errors.append('Unknown npm script: ' + script)
        for e in m.get('exceptions',[]):
            if any(not e.get(k) for k in ('rule','reason','reference','reviewCondition')): errors.append('Incomplete exception')
        for key in ('toolkit','worktreePolicy'):
            if not safe(vendor,m[key]).is_file(): errors.append('Missing shared source: ' + key)
    except (OSError,ValueError,KeyError,TypeError) as exc:
        errors.append(str(exc))
    return errors

if __name__ == '__main__':
    root = Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parent.parent
    errors = check(root)
    print(json.dumps({'ok':not errors,'errors':errors},ensure_ascii=False,indent=2))
    sys.exit(bool(errors))
