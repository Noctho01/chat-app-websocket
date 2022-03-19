import { fileURLToPath } from 'url';
import WebSocketRuning from './ws.js';
import express from 'express';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const indexPath = '/index.html';
const options = { root: path.join(__dirname, 'public') };

const app = express()
    .use(main)
    .listen(PORT, () => console.log(`Server listening in PORT ${PORT}`));

function main(req, res, next) {
    try {
        res.sendFile(indexPath, options);
    } catch (err) {
        next(err);
    }
}

WebSocketRuning(app);