// @flow
import fs from 'fs';
import debug from 'debug';
import http2 from 'http2';

import env from '../utils/env';
import appServer from './appServer';

const log = debug('app:server');
const logError = debug('app:server:error');
const { SERVER_HOST, SERVER_PORT, SERVER_URL } = env;
const options = {
    key: fs.readFileSync('certs/server.key'),
    cert: fs.readFileSync('certs/server.crt'),
    allowHTTP1: true,
};

const server = http2.createSecureServer(options);
const shutdown = code => {
    log('Останавливаем сервер ...');
    server.close();
    process.exit(code || 0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('unhandledRejection', reason => {
    logError(`unhandledRejection: Reason: ${reason}\n ${reason.stack}`);
});
process.on('uncaughtException', err => {
    logError('Необработанная ошибка приложения', err.stack);
    shutdown(1);
});

server.on('stream', appServer);
server.listen(SERVER_PORT, SERVER_HOST);

log(`Сервер запущен по адресу: ${SERVER_URL || 'error'}`);
