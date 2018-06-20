/*
* Ensure that server.js is always exists in /dist folder for first running server start command
* */
import fs from 'fs';
import path from 'path';

const dir = path.resolve('./dist');
const filePath = path.resolve('./dist/server.js');

if (!fs.existsSync(filePath)) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(filePath, ' ', { encoding: 'utf-8', flag: 'w' });
}
