import express from 'express';
import { router } from './app';
import { LoggerUtil } from './util/logger.util';

const app = express();
const port = 8888;
const log = LoggerUtil.getLogger('Transaction Generator');


// API endpoints
app.use(router);
app.use(express.static('src/public'));

// Start server
app.listen(port, () => {
    log.info(`Started server on http://localhost:${port}/...`);
});