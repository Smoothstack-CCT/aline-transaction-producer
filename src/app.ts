import express, { Request, Response } from 'express';
import path from 'path';
import { TransactionService } from './services/transaction.service';
import { GeneratorService } from './services/generator.service';
import { environment } from './environment';
import { AchTransactionService } from './services/ach.transaction.service';
import { RandomDataUtil } from './util/random-data.util';
import { LoggerUtil } from './util/logger.util';

const serviceHost = environment.serviceHost;
const router = express.Router();
const log = LoggerUtil.getLogger('Transaction Generator');

const publicDir = path.join(__dirname, 'public');
// Landing page
router.get('/', function(req: Request, res: Response) {
    res.sendFile(path.join(path.join(publicDir, 'index.html')));
});

router.post('/generate-transactions', async function(req: Request, res: Response) {
    const accountNumber = '0011017041';
    const transactionServices: TransactionService[] = [
        new AchTransactionService(serviceHost, accountNumber)
    ];

    const generatorService = new GeneratorService(transactionServices, new RandomDataUtil());

    log.info('Generating transactions...');

    await generatorService.generateTransactions(new Date(), 60);
    
    log.info('Finished generating transactions...');

});

export { router };