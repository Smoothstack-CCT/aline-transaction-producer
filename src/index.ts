import express, { Request, Response } from 'express';
import { LoggerUtil } from './util/logger.util';

const app = express();
const port = 8888;
const log = LoggerUtil.getLogger('Transaction Generator');


// API endpoints
app.get('/', function(req: Request, res: Response) {
    res.send('Transaction Generator');
});


// Start server
app.listen(port, () => {
    log.info(`Started server on http://localhost:${port}/...`);
});