import fs from 'fs';
import debug from 'debug';
import http2 from 'http2'; // tslint:disable-line

import env from '../utils/getEnv';
import appServer from './appServer';

const log = debug('app:server');
const logError = debug('app:server:error');
const { SERVER_PORT, SERVER_HOST, SERVER_URL, KEYS_FOLDER } = env;

const server = http2.createSecureServer(
    {
        allowHTTP1: true,
        ca: fs.readFileSync(`${KEYS_FOLDER}/cacert.crt`),
        cert: fs.readFileSync(`${KEYS_FOLDER}/server.crt`),
        key: fs.readFileSync(`${KEYS_FOLDER}/server.key`),
    },
    appServer,
);

const shutdown = (code: number) => {
    log('Останавливаем сервер ...');

    server.close();
    process.exit(code || 0);
};

// @ts-ignore
process.on('SIGINT', shutdown);
// @ts-ignore
process.on('SIGTERM', shutdown);

process.on('unhandledRejection', err => {
    logError(`unhandledRejection: Reason: ${err.message}\n ${err.stack}`);
});

process.on('uncaughtException', err => {
    logError('Необработанная ошибка приложения', err.stack);
    shutdown(1);
});

server.listen(SERVER_PORT, SERVER_HOST);

log(`Сервер запущен по адресу: ${SERVER_URL || 'error'}`);
