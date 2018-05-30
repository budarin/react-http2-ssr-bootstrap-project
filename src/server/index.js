// @flow
import fs from 'fs';
import debug from 'debug';
import http2 from 'http2';

import app from './server';
import '../common/babelHelpers';
import env from '../../.env.json';

const log = debug('app:server');
const logError = debug('app:server:error');

const options = {
    key: fs.readFileSync('./src/config/certs/server.key'),
    cert: fs.readFileSync('./src/config/certs/server.crt'),
    allowHTTP1: true,
};
const server = http2.createSecureServer(options);
const shutdown = code => {
    log('Останавливаем сервер ...');
    server.close();
    process.exit(code || 0);
};

const { SERVER_HOST, SERVER_PORT, SERVER_URL } = env;

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', reason => {
    logError(`unhandledRejection: Reason: ${reason}\n ${reason.stack}`);
});
process.on('uncaughtException', err => {
    logError('Необработанная ошибка приложения', err.stack);
    shutdown(1);
});

server.on('stream', app);
server.listen(SERVER_PORT, SERVER_HOST);

log(`Сервер запущен по адресу: ${SERVER_URL || 'error'}`);
