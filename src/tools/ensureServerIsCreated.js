// @flow
import fs from 'fs';
import path from 'path';

const dir = path.resolve('./dist');
const filePath = path.resolve('./dist/appServer.js');

if (!fs.existsSync(filePath)) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(filePath, ' ', { encoding: 'utf-8', flag: 'w' });
}
