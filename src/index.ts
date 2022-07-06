import express from 'express';
import { router } from './app';
import { environment } from './environment';
import { LoggerUtil } from './util/logger.util';
import { argv } from 'process';

const app = express();
const log = LoggerUtil.getLogger('Transaction Generator');

checkArgs();

const port = environment.port;

// API endpoints
app.use(express.json());
app.use(express.static('dist/public'));
app.use(router);

// Start server
app.listen(port, () => {
    log.info(`Started server on http://localhost:${port}/...`);
});

function checkArgs() {
    environment.port = argv[argv.indexOf('--port') + 1];
    environment.serviceHost = argv[argv.indexOf('--api') + 1];
}