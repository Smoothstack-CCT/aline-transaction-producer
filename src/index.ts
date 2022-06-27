import express, { Request, Response } from 'express';
import { LoggerUtil } from './util/logger.util';

const app = express();
const port = 8888;
const log = LoggerUtil.getLogger('Typescript express app');


// API endpoints
app.get('/', function(req: Request, res: Response) {
    log.info('Hello, world!');
    res.send('Hello, world!');
});


// Start server
app.listen(port, () => {
    log.info(`Started server on port ${port}...`);
});