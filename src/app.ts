import express, { Request, Response } from 'express';
import path from 'path';
import { TransactionService } from './services/transaction.service';
import { GeneratorService } from './services/generator.service';
import { environment } from './environment';
import { AchTransactionService } from './services/ach.transaction.service';
import { RandomDataUtil } from './util/random-data.util';
import { LoggerUtil } from './util/logger.util';
import { TransactionServices } from './models/transaction-services';

const serviceHost = environment.serviceHost;
const router = express.Router();
const log = LoggerUtil.getLogger('Transaction Generator');

const publicDir = path.join(__dirname, 'public');
// Landing page
router.get('/', function(req: Request, res: Response) {
    res.sendFile(path.join(path.join(publicDir, 'index.html')));
});

router.post('/generate-transactions', async function(req: Request, res: Response) {

    if (!req.body) {
        log.error('Body is empty. Cannot generate transactions with an empty request body.');
        res.sendStatus(400);
        return;
    }
    
    const { accountNumber, savingsAccountNumber, startDate, daysToSimulate } = req.body;

    if (!accountNumber || !startDate || daysToSimulate <= 0 || daysToSimulate > 90) {
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

        await generatorService.generateTransactions(new Date(startDate), daysToSimulate);
        
        log.info('Finished generating transactions...');

        res.sendStatus(200);
    } catch (e) {
        log.error('Error occurred.', e);
        res.sendStatus(500);
    }

});

export { router };