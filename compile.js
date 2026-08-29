import { compileFunc } from '@ton-community/func-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = fs.readFileSync(path.join(__dirname, 'drainer.func'), 'utf8');

const result = await compileFunc({
    sources: [
        {
            path: 'drainer.func',
            source: source
        }
    ],
    entryPoints: ['drainer.func']
});

if (result.status === 'error') {
    console.error('Ошибка компиляции:', result.message);
    process.exit(1);
}

const cell = result.output['drainer.func'];
if (!cell) {
    console.error('Не удалось получить контракт');
    process.exit(1);
}

fs.writeFileSync(path.join(__dirname, 'drainer.cell'), cell);
console.log('✅ Контракт скомпилирован в drainer.cell');
console.log('Размер:', cell.length, 'байт');