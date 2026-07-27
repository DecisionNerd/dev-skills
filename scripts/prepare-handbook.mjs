#!/usr/bin/env node
/**
 * Stage handbook/ → src/content/docs/handbook/ for Starlight.
 * Edit handbook/ only; generated tree is overwritten.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'handbook');
const OUT = path.join(ROOT, 'src', 'content', 'docs', 'handbook');
const PUBLIC_ASSETS = path.join(ROOT, 'public', 'handbook');
const STAGING = path.join(ROOT, '.handbook-staging');
const BASE = '/dev-skills/';

function walkMarkdown(dir, baseRel = '') {
	const entries = [];
	if (!fs.existsSync(dir)) return entries;
	for (const name of fs.readdirSync(dir).sort()) {
		if (name === 'assets' || name === 'README.md') continue;
		const abs = path.join(dir, name);
		const rel = baseRel ? `${baseRel}/${name}` : name;
		if (fs.statSync(abs).isDirectory()) entries.push(...walkMarkdown(abs, rel));
		else if (name.endsWith('.md')) entries.push(rel.replace(/\\/g, '/'));
	}
	return entries;
}

function stripPrefix(name) {
	return name.replace(/^\d{2}-/, '');
}

function outRel(sourceRel) {
	const parts = sourceRel.split('/');
	const file = parts.pop();
	const dirs = parts.map(stripPrefix);
	let slug = stripPrefix(file.replace(/\.md$/, ''));
	if (slug === 'index' && dirs.length === 0) return 'index.md';
	const dir = dirs.join('/');
	return dir ? `${dir}/${slug}.md` : `${slug}.md`;
}

function siteUrl(sourceRel) {
	let rel = outRel(sourceRel).replace(/\.md$/, '');
	if (rel === 'index') return `${BASE}handbook/`;
	if (rel.endsWith('/index')) rel = rel.slice(0, -'/index'.length);
	return `${BASE}handbook/${rel}/`;
}

function rewriteLinks(body, sourceRelDir) {
	return body
		.replace(/\]\(([^)#]+\.md)(#[^)]*)?\)/g, (match, rel, anchor = '') => {
			if (/^[a-z]+:\/\//.test(rel)) return match;
			const resolved = path.posix.normalize(path.posix.join(sourceRelDir || '.', rel));
			if (resolved.startsWith('..') && !resolved.includes('handbook')) {
				/* allow ../ within handbook */
			}
			const fromHandbook = path.posix.normalize(
				path.posix.join(sourceRelDir || '.', rel),
			);
			// Resolve against handbook root
			const absFromRoot = path.posix.normalize(
				sourceRelDir ? path.posix.join(sourceRelDir, rel) : rel,
			);
			const clean = absFromRoot.replace(/^(\.\/)+/, '');
			return `](${siteUrl(clean)}${anchor || ''})`;
		})
		.replace(/\]\((?:\.\.\/)*assets\/([^)]+)\)/g, `](${BASE}handbook/$1)`)
		.replace(/\]\(assets\/([^)]+)\)/g, `](${BASE}handbook/$1)`);
}

function titleFromBody(body, fallback) {
	const m = body.match(/^#\s+(.+)$/m);
	return m ? m[1].trim() : fallback;
}

function descriptionFromBody(body) {
	const lines = body.split('\n').map((l) => l.trim()).filter(Boolean);
	for (const line of lines) {
		if (
			line.startsWith('#') ||
			line.startsWith('!') ||
			line.startsWith('*') ||
			line.startsWith('```') ||
			line.startsWith('-') ||
			line.startsWith('|') ||
			line.startsWith('>')
		) {
			continue;
		}
		return line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').slice(0, 180);
	}
	return "The 'This is Fine' Guide to Building Software";
}

function frontmatter({ title, description, order }) {
	const esc = (s) => JSON.stringify(s);
	const lines = ['---', `title: ${esc(title)}`, `description: ${esc(description)}`];
	if (order !== undefined) lines.push('sidebar:', `  order: ${order}`);
	lines.push('---', '', '');
	return lines.join('\n');
}

const ORDER = {
	'index.md': 0,
	'why-it-works.md': 1,
	'sources.md': 98,
	'continue-learning.md': 99,
};

function orderFor(rel) {
	if (ORDER[rel] !== undefined) return ORDER[rel];
	if (rel.startsWith('flow/')) {
		if (rel.endsWith('index.md')) return 2;
		return 2 + (parseInt(path.basename(rel), 10) || 5);
	}
	if (rel.startsWith('architecture/')) {
		if (rel.endsWith('index.md')) return 8;
		return 9;
	}
	if (rel.startsWith('paths/compute/')) {
		if (rel.endsWith('index.md')) return 18;
		return 19;
	}
	if (rel.startsWith('paths/')) {
		if (rel.endsWith('index.md')) return 10;
		return 10 + (parseInt(path.basename(rel), 10) || 5);
	}
	if (rel.startsWith('orientation/')) {
		return 25 + (parseInt(path.basename(rel), 10) || 5);
	}
	if (rel.startsWith('concepts/')) {
		return 30 + (parseInt(path.basename(rel), 10) || 5);
	}
	if (rel.startsWith('strategies/')) {
		return 50 + (parseInt(path.basename(rel), 10) || 5);
	}
	if (rel.startsWith('practices/')) {
		return 60;
	}
	return 70;
}

fs.rmSync(STAGING, { recursive: true, force: true });
const stagingOut = path.join(STAGING, 'handbook');
fs.mkdirSync(stagingOut, { recursive: true });

const files = walkMarkdown(SRC);
for (const rel of files) {
	const abs = path.join(SRC, rel);
	let body = fs.readFileSync(abs, 'utf8');
	// strip leading H1 (Starlight uses title)
	const title = titleFromBody(body, rel);
	body = body.replace(/^#\s+.+\n+/, '');
	const sourceRelDir = path.posix.dirname(rel);
	body = rewriteLinks(body, sourceRelDir === '.' ? '' : sourceRelDir);
	const order = orderFor(rel);
	const out = outRel(rel);
	const dest = path.join(stagingOut, out);
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.writeFileSync(
		dest,
		frontmatter({ title, description: descriptionFromBody(body), order }) + body,
	);
}

// assets → public/handbook
fs.rmSync(PUBLIC_ASSETS, { recursive: true, force: true });
const assetsSrc = path.join(SRC, 'assets');
if (fs.existsSync(assetsSrc)) {
	fs.mkdirSync(PUBLIC_ASSETS, { recursive: true });
	for (const name of fs.readdirSync(assetsSrc)) {
		fs.copyFileSync(path.join(assetsSrc, name), path.join(PUBLIC_ASSETS, name));
	}
}

// atomic replace
const previous = path.join(STAGING, 'handbook.previous');
fs.rmSync(previous, { recursive: true, force: true });
if (fs.existsSync(OUT)) fs.renameSync(OUT, previous);
fs.renameSync(stagingOut, OUT);
fs.rmSync(previous, { recursive: true, force: true });
fs.rmSync(STAGING, { recursive: true, force: true });

console.log(`handbook: prepared ${files.length} pages → src/content/docs/handbook/`);
