import { CardRequest } from "../models/card-request.model";
import { TransactionService } from "./transaction.service";

export class CreditTransactionService extends TransactionService {

    constructor(serviceHost: string, private cardRequest: CardRequest) {
        super(serviceHost);
    }

    deposit({ amount, date }: { amount: number; date?: Date | undefined; }) {
        return this.createTransaction({
            cardRequest: this.cardRequest,
            amount: amount,
            method: 'CREDIT_CARD',
            type: "DEPOSIT",
            date: date ? date : new Date(),
            merchantCode: 'ALINE',
            merchantName: 'Aline Financial',
            description: 'Credit card deposit'
        });
    }
    withdraw(options: { amount: number; date?: Date | undefined; }) {
        return this.createTransaction({
            cardRequest: this.cardRequest,
            method: 'CREDIT_CARD',
            type: 'WITHDRAWAL',
            description: 'Credit card withdrawal',
            ...options
        });
    }
    
    payBill(options: { amount: number; merchantCode: string; merchantName: string; date?: Date | undefined; }) {
        return this.createTransaction({
            cardRequest: this.cardRequest,
            method: 'CREDIT_CARD',
            type: 'PAYMENT',
            description: 'Credit card payment',
            ...options
        });
    }

    purchase(options: { amount: number; merchantName: string; merchantCode: string; description: string; date?: Date | undefined; }) {
        return this.createTransaction({
            cardRequest: this.cardRequest,
            method: 'CREDIT_CARD',
            type: 'PURCHASE',
            ...options
        });
    }
}