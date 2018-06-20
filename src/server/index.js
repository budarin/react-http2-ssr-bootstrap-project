import fs from 'fs';
import debug from 'debug';
import http2 from 'http2';

import env from '../utils/getEnv';
import appServer from './appServer';

const log = debug('app:server');
const logError = debug('app:server:error');

const { SERVER_PORT, SERVER_HOST, SERVER_URL } = env;

const options = {
    key: fs.readFileSync('certs/server.key'),
    cert: fs.readFileSync('certs/server.crt'),
    allowHTTP1: true,
};

const server = http2.createSecureServer(options, appServer);

const shutdown = code => {
    log('Останавливаем сервер ...');

    server.close();
    process.exit(code || 0);
};

process.on('SIGINT', shutdown);
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
