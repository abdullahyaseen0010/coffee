import fs from 'node:fs';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'lib', 'data.ts');
const source = fs.readFileSync(filePath, 'utf8');
const urlMatches = [...source.matchAll(/https?:\/\/[^\s'"`]+/g)];
const urls = urlMatches.map((match) => match[0]);

const duplicates = [...new Set(urls.filter((url, index) => urls.indexOf(url) !== index))];

if (duplicates.length > 0) {
  console.error('Duplicate product image URLs found:');
  for (const url of duplicates) {
    console.error(`- ${url}`);
  }
  process.exit(1);
}

console.log(`Checked ${urls.length} image URLs; no duplicates found.`);
