import express, { Request, Response } from 'express';
import path from 'path';
import { GeneratorService } from './services/generator.service';
import { environment } from './environment';
import { AchTransactionService } from './services/ach.transaction.service';
import { RandomDataUtil } from './util/random-data.util';
import { LoggerUtil } from './util/logger.util';
import { TransactionServices } from './models/transaction-services';
import axios from 'axios';
import dayjs from 'dayjs';
import { argv, exit } from 'process';

checkArgs();

const serviceHost = environment.serviceHost;
const router = express.Router();
const log = LoggerUtil.getLogger('Transaction Generator');

if (!serviceHost) {
    log.error('The API host url is required to start this application.');
    exit();
}
    

const publicDir = path.join(__dirname, 'public');
// Landing page
router.get('/', function(req: Request, res: Response) {
    res.sendFile(path.join(path.join(publicDir, 'index.html')));
});

// Forward login request to server
router.post('/login', async function(req: Request, res: Response) {

    if (!req.body) {
        log.error('Unable to long with an empty request body.');
        res.sendStatus(400);
        return;
    }

    const authRequest = req.body;
    const authResponse = await axios.post(`${serviceHost}/api/login`, authRequest);

    if (authResponse.status == 200) {
        const bearerToken = authResponse.headers['authorization'];
        res.setHeader('authorization', bearerToken);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

router.post('/generate-transactions', async function(req: Request, res: Response) {

    if (!req.body) {
        log.error('Body is empty. Cannot generate transactions with an empty request body.');
        res.sendStatus(400);
        return;
    }
    
    const { accountNumber, savingsAccountNumber, startDate } = req.body;

    if (!accountNumber || !startDate || dayjs(startDate).isAfter(new Date(), 'date')) {
        log.error('Data is invalid.');
        res.sendStatus(400);
        return;
    }

    const transactionServices: TransactionServices = {
        achService: new AchTransactionService(serviceHost, accountNumber, savingsAccountNumber)
    }

    const generatorService = new GeneratorService(transactionServices, new RandomDataUtil());

    try {
        log.info('Generating transactions...');

        await generatorService.generateTransactions(new Date(startDate));
        
        log.info('Finished generating transactions...');

        res.sendStatus(200);
    } catch (e) {
        log.error('Error occurred.', e);
        res.sendStatus(500);
    }

});

export { router };

function checkArgs() {
    environment.port = argv[argv.indexOf('--port') + 1];
    environment.serviceHost = argv[argv.indexOf('--api') + 1];
}