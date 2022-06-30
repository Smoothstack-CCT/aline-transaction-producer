import express, { Request, Response } from 'express';
import path from 'path';
import { TransactionService } from './services/transaction.service';

const service = new TransactionService();
const router = express.Router();

const publicDir = path.join(__dirname, 'public');

// Landing page
router.get('/', function(req: Request, res: Response) {
    res.sendFile(path.join(path.join(publicDir, 'index.html')));
});

router.post('/transaction', function(req: Request, res: Response) {
    service.createTransaction('http://localhost:8080',
        {
            accountNumber: '0011017041',
            type: 'DEPOSIT',
            method: 'ACH',
            date: new Date(),
            amount: 500,
            merchantCode: 'ALINE',
            merchantName: 'Aline Financial',
            description: 'Just another deposit',
            hold: false
        }
    );
});

export { router };