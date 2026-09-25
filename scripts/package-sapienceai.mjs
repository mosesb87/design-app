// Builds the site and packages it for the shared host: deploy/sapienceai.zip holds one top-level
// folder, sapienceai/, with the static files and its own .htaccess. Extracting the zip inside the
// folder that holds mousabatarseh.com's WordPress (the one with wp-config.php) creates
// /sapienceai/ and changes nothing else. Usage: node scripts/package-sapienceai.mjs
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
execSync('npm run build', { cwd: root, stdio: 'inherit' });
const dist = path.join(root, 'dist');
const out = path.join(root, 'deploy');
fs.mkdirSync(out, { recursive: true });
const stage = path.join(out, 'sapienceai');
fs.rmSync(stage, { recursive: true, force: true });
fs.cpSync(dist, stage, { recursive: true });
const zip = path.join(out, 'sapienceai.zip');
fs.rmSync(zip, { force: true });
// python's zipfile is always present here and keeps dotfiles (.htaccess)
execSync(`python3 -c "import os,zipfile;z=zipfile.ZipFile('${zip}','w',zipfile.ZIP_DEFLATED)\nfor d,_,fs in os.walk('sapienceai'):\n  for f in fs: z.write(os.path.join(d,f))\nz.close()"`, { cwd: out, stdio: 'inherit' });
fs.rmSync(stage, { recursive: true, force: true });
const files = execSync(`python3 -c "import zipfile;z=zipfile.ZipFile('${zip}');print(len(z.namelist()));print('\\n'.join(sorted(z.namelist())))"`).toString();
console.log(`wrote ${path.relative(root, zip)} (${(fs.statSync(zip).size / 1024).toFixed(0)} KB)\n${files}`);
