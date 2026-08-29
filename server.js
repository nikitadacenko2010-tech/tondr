import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('..'));

app.listen(PORT, () => {
    console.log(`🖥️ Сервер запущен: http://localhost:${PORT}/index.html`);
    console.log('📌 Открой этот URL в браузере и нажми "Подключить"');
});