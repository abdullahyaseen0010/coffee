import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const appDir = path.join(root, 'app');
const componentDir = path.join(root, 'components');
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      files.push(full);
    }
  }
}

walk(appDir);
walk(componentDir);

const patterns = [
  /text-\[var\(--foreground\)\]/g,
  /text-\[var\(--muted\)\]/g,
  /text-white/g,
  /text-black/g,
  /text-\[#ffffff\]/g,
  /text-\[#000000\]/g,
  /text-\[#f5efe7\]/g,
  /text-\[#f3ecdf\]/g,
  /text-\[#d7c8bb\]/g,
];

const ignoredFiles = new Set([
  "app/page.tsx",
  "components/site-header.tsx",
  "components/site-footer.tsx",
  "components/product-card.tsx",
]);

const flagged = [];
for (const file of files) {
  const relativeFile = path.relative(root, file).replace(/\\/g, "/");
  if (ignoredFiles.has(relativeFile)) {
    continue;
  }

  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of patterns) {
    const nextPattern = new RegExp(pattern.source, pattern.flags);
    if (nextPattern.test(text)) {
      flagged.push({ file: relativeFile, matches: [...text.matchAll(nextPattern)].length });
      break;
    }
  }
}

if (flagged.length > 0) {
  console.error('Potential inherited text-color patterns detected:');
  for (const item of flagged) {
    console.error(`- ${item.file} (${item.matches} matching pattern(s))`);
  }
  process.exit(1);
}

console.log('No inherited text-color patterns found in app/components source files.');
