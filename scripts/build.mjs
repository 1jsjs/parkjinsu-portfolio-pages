import { cp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const files = ['index.html', 'resume.html', 'portfolio.html', 'notes.html', 'style.css', 'site.js'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of files) {
  await stat(path.join(root, file));
  await cp(path.join(root, file), path.join(output, file));
}

await cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`Built ${files.length} site files and assets in ${output}`);
