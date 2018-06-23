import fs from 'fs';
import path from 'path';
import parseJSON from './parseJSON';

const prodEnvPath = '.env.production.json';
const devEnvPath = '.env.development.json';
const defaultEnvPath = '.env.json';

// interface IEnv {
//     SERVER_PROTOCOL: string;
//     SERVER_PORT: number;
//     SERVER_HOST: string;
//     SERVER_URL: string;
//     STATIC_PROTOCOL: string;
//     STATIC_PORT: number;
//     STATIC_HOST: string;
//     STATIC_URL: string;
// }

function getParsedEnv(envPath) {
    return parseJSON(fs.readFileSync(path.resolve(envPath), { encoding: 'utf-8' }));
}

function getEnv() {
    if (process.env.NODE_ENV === 'production' && fs.existsSync(prodEnvPath)) {
        return getParsedEnv(prodEnvPath);
    }

    if (process.env.NODE_ENV === 'development' && fs.existsSync(devEnvPath)) {
        return getParsedEnv(devEnvPath);
    }

    if (fs.existsSync(defaultEnvPath)) {
        return getParsedEnv(defaultEnvPath);
    }

    /* tslint:disable object-literal-sort-keys */
    const Env = {
        SERVER_PROTOCOL: 'https',
        SERVER_PORT: 443,
        SERVER_HOST: 'localhost',
        SERVER_URL: 'https://localhost',
        STATIC_PROTOCOL: 'https',
        STATIC_PORT: 444,
        STATIC_HOST: 'localhost',
        STATIC_URL: 'https://localhost:444',
    };
    /* tslint:enable object-literal-sort-keys */

    return Env;
}

export default getEnv();
