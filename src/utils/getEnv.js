// @flow
import fs from 'fs';
import path from 'path';
import parseJSON from './parseJSON';

export type ENV = {
    SERVER_PROTOCOL: string,
    SERVER_PORT: number,
    SERVER_HOST: string,
    SERVER_URL: string,
    STATIC_PROTOCOL: string,
    STATIC_PORT: number,
    STATIC_HOST: string,
    STATIC_URL: string,
};

const prodEnvPath = '.env.production.json';
const devEnvPath = '.env.development.json';
const defaultEnvPath = '.env.json';

function getParsedEnv(envPath: string): Object {
    return parseJSON(fs.readFileSync(path.resolve(envPath), { encoding: 'utf-8' }));
}

function getEnv(): ENV {
    if (process.env.NODE_ENV === 'production' && fs.existsSync(prodEnvPath)) {
        return getParsedEnv(prodEnvPath);
    }

    if (process.env.NODE_ENV === 'development' && fs.existsSync(devEnvPath)) {
        return getParsedEnv(devEnvPath);
    }

    if (fs.existsSync(defaultEnvPath)) {
        return getParsedEnv(defaultEnvPath);
    }

    return {};
}

export default getEnv();
