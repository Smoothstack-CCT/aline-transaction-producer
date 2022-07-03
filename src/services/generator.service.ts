import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { TransactionType } from '../models/transaction.types';
import { TransactionService } from "./transaction.service";
import { RandomDataUtil } from '../util/random-data.util';
import { LoggerUtil } from '../util/logger.util';


export class GeneratorService {

    log = LoggerUtil.getLogger('Generator Service');
    currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
      

    get bills(): { biller: string, billerCode: string, amount: number, dueDay: number }[] {
        return [
            { 
                biller: 'Rent Apartments Company',
                billerCode: 'RENTAPTS',
                amount: 120000,
                dueDay: 1
            },
            {
                biller: 'Electic Power Inc.',
                billerCode: 'ELECPWR',
                amount: this.getRandomNum(5000, 7500),
                dueDay: 1
            }, 
            {
                biller: 'Wet Water LLC',
                billerCode: 'WETWATER',
                amount: this.getRandomNum(2000, 3500),
                dueDay: 1
            },
            {
                biller: 'The Trash Company',
                billerCode: 'TRASHCO',
                amount: this.getRandomNum(15000, 2000),
                dueDay: 1
            },
            {
                biller: 'The Internet',
                billerCode: 'INTERNET',
                amount: this.getRandomNum(12000, 19000),
                dueDay: 28
            },
            {
                biller: 'Phone Bill Guys LLC',
                billerCode: 'PBGLLC',
                amount: 9500,
                dueDay: 28
            },
            {
                biller: 'AllFarm Insurance',
                billerCode: 'ALFRMINS',
                amount: 18000,
                dueDay: 28
            },
            {
                biller: 'Used Cars For Lease',
                billerCode: 'USEDCARS',
                amount: 25525,
                dueDay: 28
            }
        ];
    }

    nextPayday = new Date();

    constructor(private transactionServices: TransactionService[], private dataUtil: RandomDataUtil) {} 
    
    async generateTransactions(startingDate: Date, daysToSimulate: number) {

        if (daysToSimulate == 0) return;

        await this.doTransactions(startingDate);

        await this.generateTransactions(dayjs(startingDate).add(1, 'day').toDate(), daysToSimulate-1);
    }

    async doTransactions(date: Date) {
        let currDate = date;

        this.log.info('------------------------------------------------------------------');
        this.log.info(`Doing transactions for date: ${dayjs(date).format('MM/DD/YYYY')}...`);

        const isPayday = dayjs(date).isSame(dayjs(this.nextPayday), 'date');
        let paycheck = 0;

        if (isPayday) {
            const { data } = await this.doPayday(date);
            paycheck = data.amount;
            this.nextPayday = dayjs(this.nextPayday).add(2, 'week').toDate();
        }

        const billsAmount = await this.doPayBills(date);

        let purchasesTotal = 0;
        // Do purchases
        for (let i = 0; i < this.getRandomNum(2, 10); i++) {
            try {
                const { data } = await this.doPurchase(date);
                purchasesTotal += data.amount;
            } catch(e: any) {
                this.log.error('Unable to do transaction.');
                this.log.error(e.data);
            } finally {
                currDate = dayjs(currDate).add(this.getRandomNum(1, 120), 'minute').toDate();
            }
        }

        
        this.log.info('\tSummary:');
        this.log.info(`\t\tPAID TODAY:\t\t${isPayday}`);
        this.log.info(`\t\tPAID:\t\t\t${this.formatCurrency(paycheck)}`);
        this.log.info(`\t\tBILLS:\t\t\t${this.formatCurrency(billsAmount)}`);
        this.log.info(`\t\tPURCHASES:\t\t${this.formatCurrency(purchasesTotal)}`);
        this.log.info('\tEnd of Summary');
        this.log.info('------------------------------------------------------------------');
        this.log.info('');

    }

    async doPayday(date: Date) {
        const service = this.randomTransactionService;

        const paycheck = this.getRandomNum(250000, 500000);
        this.log.info(`Depositing paycheck ${this.formatCurrency(paycheck)} on ${dayjs(date).format('MM/DD/YYYY')}...`);

        return service.deposit({
            amount: paycheck, 
            date
        });
    }

    async doPayBills(date: Date) {
        let billsAmount = 0;
        for (let { biller, billerCode, amount, dueDay } of this.bills) {
            const service = this.randomTransactionService;
            if (dayjs(date).date() == dueDay) {
                this.log.info(`Paying bill ${biller} - ${this.formatCurrency(amount)}...`);
                await service.payBill({
                    amount,
                    merchantName: biller,
                    merchantCode: billerCode,
                    date
                });
                billsAmount += amount;
            }
        }
        return billsAmount;

    }

    async doPurchase(date: Date) {
        const { merchantCode, merchantName, merchantType } = this.dataUtil.merchant;

        const service = this.randomTransactionService;

        return service.purchase({
            amount: this.getRandomNum(500, 5000),
            description: `${merchantType} - purchase at ${merchantName}`,
            merchantCode,
            merchantName,
            date
        });
    }

    get randomTransactionService(): TransactionService {
        return this.transactionServices[Math.floor(Math.random() * this.transactionServices.length)];
    }

    getRandomNum(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    formatCurrency(cents: number) {
        return this.currencyFormatter.format(cents/100);
    }


}