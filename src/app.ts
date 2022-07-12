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
import jwtDecode from 'jwt-decode';

const log = LoggerUtil.getLogger('Transaction Generator');

checkArgs();

const serviceHost = environment.serviceHost;
const router = express.Router();

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

    try {
        const authRequest = req.body;
        const authResponse = await axios.post(`${serviceHost}/login`, authRequest);

        if (authResponse.status == 200) {
            const bearerToken = authResponse.headers['authorization'];
            validateJwt(bearerToken);
            res.setHeader('authorization', bearerToken)
                .status(200)
                .send({ message: 'success' });
            log.info(`${authRequest.username} successfully logged in.`);
        } else {
            log.info(`${authRequest.username} attempted to login with incorrect username and password.`);
            res.sendStatus(403);
        }
    } catch (e) {
        log.error('Unable to login.');
        res.sendStatus(403);
    }
});

function validateJwt(jwt: string) {
    const {sub, authority, exp}: {
        sub: string,
        authority: string,
        iat: number,
        exp: number
    } = jwtDecode(jwt);

    const expDate = new Date(exp * 1000);
    
    if (authority !== 'administrator')
        throw new Error(`User ${sub} is not an administrator.`);

    if (dayjs(dayjs()).isAfter(dayjs(expDate)))
        throw new Error('Token is expired. Please log in again.');
}

router.post('/generate-transactions', async function(req: Request, res: Response) {

    const { authorization } = req.headers;

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

        generatorService.nextPayday = startDate;

        await generatorService.generateTransactions(new Date(startDate), authorization);
        
        log.info('Finished generating transactions...');

        res.sendStatus(200);
    } catch (e) {
        log.error('Error occurred.', e);
        res.sendStatus(500);
    }

});

router.get('*', function(req: Request, res: Response) {
    res.sendFile(path.join(path.join(publicDir, 'index.html')));
});

export { router };

function checkArgs() {
    environment.port = argv[argv.indexOf('--port') + 1];
    if (argv.indexOf('--api') >= 0) {
        environment.serviceHost = argv[argv.indexOf('--api') + 1];
    } else {
        log.error('API url must be set using --api option.');
        exit();
    }

    log.info(`Service host set to: ${environment.serviceHost}...`);
}