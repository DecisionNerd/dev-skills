// sync-contract.mjs — propagate the canonical operating contract into every SKILL.md
// Single source of truth: handbook/concepts/14-operating-contract.md (between markers).
// Companion to check-skill-contract.mjs (which verifies). Run: node scripts/sync-contract.mjs [--root <dir>]
// Node ESM, no dependencies.
//
// The block is located structurally, not by exact text, so editing the canonical
// wording still syncs: from the `## Operating contract` heading, through the
// "Shared by every …" intro line, through the consecutive run of `- ` bullets.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const args = process.argv.slice(2);
const rootIdx = args.indexOf('--root');
const repoRoot = rootIdx !== -1 ? args[rootIdx + 1] : join(dirname(fileURLToPath(import.meta.url)), '..');

// --- Load canonical contract block (same extraction as the checker) ---
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
const canonicalBlock = conceptText.slice(startIdx + startMarker.length, endIdx).replace(/^\n/, '').replace(/\n$/, '');

const norm = (line) => line.trimEnd();
const canonicalLines = canonicalBlock.split('\n').map(norm);

// --- Locate the block structurally in a SKILL.md; return [start, end] line indices or null ---
function findBlock(lines) {
  const heading = lines.findIndex((l) => l.trim() === '## Operating contract');
  if (heading === -1) return null;
  let bulletsStart = -1;
  for (let i = heading + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t === '') continue;
    if (t.startsWith('- ')) {
      bulletsStart = i;
      break;
    }
    // Allow one intro paragraph line (e.g. "Shared by every …"), then expect bullets.
    if (bulletsStart === -1 && !t.startsWith('#')) continue;
    return null; // non-intro, non-bullet content: not the block shape we maintain
  }
  if (bulletsStart === -1) return null;
  let bulletsEnd = bulletsStart;
  while (bulletsEnd + 1 < lines.length && lines[bulletsEnd + 1].trimStart().startsWith('- ')) {
    bulletsEnd++;
  }
  return [heading, bulletsEnd];
}

// --- Sync every SKILL.md ---
const skillsRoot = join(repoRoot, 'skills');
const skillDirs = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(skillsRoot, d.name, 'SKILL.md')))
  .map((d) => d.name);

let ok = 0;
let failed = 0;

for (const name of skillDirs) {
  const path = join(skillsRoot, name, 'SKILL.md');
  const lines = readFileSync(path, 'utf8').split('\n');
  const span = findBlock(lines);

  if (!span) {
    console.error(`${name.padEnd(18)} FAIL    contract block not found (structural scan)`);
    failed++;
    continue;
  }

  const [start, end] = span;
  const current = lines.slice(start, end + 1).map(norm);
  const isCurrent =
    current.length === canonicalLines.length && canonicalLines.every((l, j) => current[j] === l);

  if (isCurrent) {
    console.log(`${name.padEnd(18)} current`);
    ok++;
    continue;
  }

  lines.splice(start, end - start + 1, ...canonicalBlock.split('\n'));
  writeFileSync(path, lines.join('\n'));
  console.log(`${name.padEnd(18)} synced`);
  ok++;
}

console.log(`\n${ok}/${skillDirs.length} skills synced or current`);
if (failed > 0) process.exit(1);
