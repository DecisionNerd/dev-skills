#!/usr/bin/env node
// check-skill-contract.mjs — validate every SKILL.md carries the canonical operating contract
// Node ESM, no dependencies. Run: node scripts/check-skill-contract.mjs [--only a,b,c] [--mirrors] [--root <dir>]

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

// --- CLI args ---
const args = process.argv.slice(2);
const onlyIdx = args.indexOf('--only');
const onlySkills = onlyIdx !== -1 ? args[onlyIdx + 1].split(',') : null;
const mirrors = args.includes('--mirrors');
const rootIdx = args.indexOf('--root');
const skillsRoot = rootIdx !== -1 ? resolve(args[rootIdx + 1]) : join(repoRoot, 'skills');

// --- Load canonical contract block ---
const conceptFile = join(repoRoot, 'handbook/concepts/14-operating-contract.md');
const conceptText = readFileSync(conceptFile, 'utf8');
const startMarker = '<!-- contract:start -->';
const endMarker = '<!-- contract:end -->';
const startIdx = conceptText.indexOf(startMarker);
const endIdx = conceptText.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) {
  console.error('ERROR: markers missing in concept file');
  process.exit(1);
}
// The canonical block is the text between the markers (exclusive), trimmed of surrounding newlines
const canonicalBlock = conceptText.slice(startIdx + startMarker.length, endIdx).replace(/^\n/, '').replace(/\n$/, '');

// Normalize trailing whitespace per line
function normalizeWs(text) {
  return text.split('\n').map(l => l.trimEnd()).join('\n');
}
const canonicalNorm = normalizeWs(canonicalBlock);

// --- Banned phrases (case-insensitive; only the exact canonical contract text is exempt) ---
const BANNED = [
  'Do you want me to',
  'Would you like',
  'Follow-Up Prompt',
  'proceed?',
  'continue?',
  'think step by step',
  'ultrathink',
  'think carefully',
];

// --- Discover skills ---
// A directory without SKILL.md (e.g. a leftover after a move) is not a skill.
const allSkillDirs = readdirSync(skillsRoot, { withFileTypes: true })
  .filter(d => d.isDirectory() && existsSync(join(skillsRoot, d.name, 'SKILL.md')))
  .map(d => d.name);
for (const d of readdirSync(skillsRoot, { withFileTypes: true })) {
  if (d.isDirectory() && !allSkillDirs.includes(d.name)) console.log(`SKIP ${d.name} (no SKILL.md)`);
}

const skillsToCheck = onlySkills
  ? onlySkills.filter(s => allSkillDirs.includes(s))
  : allSkillDirs;

if (onlySkills) {
  const missing = onlySkills.filter(s => !allSkillDirs.includes(s));
  if (missing.length) {
    console.error(`ERROR: skills not found in ${skillsRoot}: ${missing.join(', ')}`);
    process.exitCode = 1;
  }
}

// --- Mirror description lookup ---
const mirrorDirs = [
  join(repoRoot, 'src/content/docs/skills/craft'),
  join(repoRoot, 'src/content/docs/skills/github'),
  join(repoRoot, 'src/content/docs/skills/ops'),
  join(repoRoot, 'src/content/docs/skills/agents'),
];

function findMirror(skillName) {
  for (const dir of mirrorDirs) {
    const p = join(dir, `${skillName}.md`);
    if (existsSync(p)) return p;
  }
  return null;
}

function extractFrontmatterField(text, field) {
  // Read only the leading frontmatter block, never body lines.
  const fm = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!fm) return null;
  text = fm[1] + '\n';
  // Single-line: field: value
  const reSingle = new RegExp(`^${field}:\\s+(.+)$`, 'm');
  const mSingle = reSingle.exec(text);
  if (mSingle) {
    const val = mSingle[1].trim();
    // YAML block scalar indicators — fall through to block parser
    if (val !== '>' && val !== '|' && val !== '>-' && val !== '|-') {
      // Strip surrounding quotes if present (e.g. description: "foo")
      return val.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
    }
  }
  // Block scalar (> or |): collect subsequent indented lines
  const reBlock = new RegExp(`^${field}:\\s*[>|][>|\\-]*\\s*\\n((?:[ \\t]+[^\\n]*\\n?)*)`, 'm');
  const mBlock = reBlock.exec(text);
  if (mBlock) {
    const lines = mBlock[1].split('\n').map(l => l.trim()).filter(l => l !== '');
    return lines.join(' ');
  }
  return null;
}

// --- Run checks ---
let anyFail = false;
const rows = [];

for (const skill of skillsToCheck) {
  const skillMdPath = join(skillsRoot, skill, 'SKILL.md');
  const failures = [];

  if (!existsSync(skillMdPath)) {
    failures.push('SKILL.md not found');
    rows.push({ skill, status: 'FAIL', reasons: failures });
    anyFail = true;
    continue;
  }

  const text = readFileSync(skillMdPath, 'utf8');

  // 1. Frontmatter: name and description present
  if (!extractFrontmatterField(text, 'name')) failures.push('frontmatter: name missing');
  if (!extractFrontmatterField(text, 'description')) failures.push('frontmatter: description missing');

  // 2. Contract block present verbatim (normalize trailing whitespace only)
  const textNorm = normalizeWs(text);
  if (!textNorm.includes(canonicalNorm)) {
    failures.push('contract block missing or not verbatim');
  }

  // 3. Line count < 500
  const lines = text.split('\n').length;
  if (lines >= 500) failures.push(`too long: ${lines} lines (limit 499)`);

  // 4. Banned phrases in every .md/.yaml file of the skill (canonical contract text removed first)
  const skillDir = join(skillsRoot, skill);
  const allFiles = getSkillTextFiles(skillDir);
  for (const fp of allFiles) {
    const ft = readFileSync(fp, 'utf8');
    const ftStripped = fp === skillMdPath ? normalizeWs(ft).replace(canonicalNorm, '') : ft;
    for (const phrase of BANNED) {
      const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      if (re.test(ftStripped)) {
        const rel = fp.replace(skillsRoot + '/', '');
        failures.push(`banned phrase "${phrase}" in ${rel}`);
      }
    }
  }

  // 5. Mirrors check
  if (mirrors) {
    const mirrorPath = findMirror(skill);
    if (mirrorPath) {
      const mirrorText = readFileSync(mirrorPath, 'utf8');
      const skillDesc = extractFrontmatterField(text, 'description');
      const mirrorDesc = extractFrontmatterField(mirrorText, 'description');
      if (skillDesc && mirrorDesc) {
        const norm = s => s.replace(/\s+/g, ' ').replace(/\\"/g, '"').replace(/\\'/g, "'").trim();
        if (norm(skillDesc) !== norm(mirrorDesc)) {
          failures.push(`mirror description mismatch:\n    SKILL.md:  ${skillDesc}\n    mirror:    ${mirrorDesc}`);
        }
      } else if (!mirrorDesc) {
        failures.push('mirror: description missing');
      }
    } else {
      failures.push('mirror file not found');
    }
  }

  const status = failures.length === 0 ? 'PASS' : 'FAIL';
  if (status === 'FAIL') anyFail = true;
  rows.push({ skill, status, reasons: failures });
}

// --- Print table ---
const maxSkill = Math.max(...rows.map(r => r.skill.length), 5);
const header = `${'Skill'.padEnd(maxSkill)}  Status  Reasons`;
console.log(header);
console.log('-'.repeat(header.length));
for (const row of rows) {
  const status = row.status === 'PASS' ? 'PASS  ' : 'FAIL  ';
  const reasons = row.reasons.length === 0 ? '' : row.reasons[0];
  console.log(`${row.skill.padEnd(maxSkill)}  ${status}  ${reasons}`);
  for (const r of row.reasons.slice(1)) {
    console.log(`${''.padEnd(maxSkill)}          ${r}`);
  }
}
console.log('');
const passing = rows.filter(r => r.status === 'PASS').length;
console.log(`${passing}/${rows.length} passed`);

process.exit(anyFail || process.exitCode ? 1 : 0);

// --- Helpers ---
function getSkillTextFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getSkillTextFiles(p));
    } else if (entry.isFile() && /\.(md|ya?ml)$/.test(entry.name)) {
      results.push(p);
    }
  }
  return results;
}
