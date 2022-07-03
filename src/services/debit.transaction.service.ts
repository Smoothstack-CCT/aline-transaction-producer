import { CardRequest } from "../models/card-request.model";
import { TransactionService } from "./transaction.service";

export class DebitTransactionService extends TransactionService {

    constructor(serviceHost: string, private cardRequest: CardRequest) {
        super(serviceHost);
    }

    deposit({ amount, date }: { amount: number; date?: Date | undefined; }) {
        return this.createTransaction({
            cardRequest: this.cardRequest,
            amount: amount,
            method: 'DEBIT_CARD',
            type: "DEPOSIT",
            date: date ? date : new Date(),
            merchantCode: 'ALINE',
            merchantName: 'Aline Financial',
            description: 'Debit card deposit'
        });
    }
    withdraw(options: { amount: number; date?: Date | undefined; }) {
        return this.createTransaction({
            cardRequest: this.cardRequest,
            method: 'DEBIT_CARD',
            type: 'WITHDRAWAL',
            description: 'Debit card deposit',
            ...options
        });
    }
    
    async payBill(options: { amount: number; merchantCode: string; merchantName: string; date?: Date | undefined; }) {
        return this.createTransaction({
            cardRequest: this.cardRequest,
            method: 'DEBIT_CARD',
            type: 'PAYMENT',
            description: 'Debit card payment',
            ...options
        });
    }

    async purchase(options: { amount: number; merchantName: string; merchantCode: string; description: string; date?: Date | undefined; }) {
        return this.createTransaction({
            cardRequest: this.cardRequest,
            method: 'DEBIT_CARD',
            type: 'PURCHASE',
            ...options
        });
    }
}