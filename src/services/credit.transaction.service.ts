import { CardRequest } from "../models/card-request.model";
import { TransactionService } from "./transaction.service";

export class CardTransactionService extends TransactionService {

    constructor(serviceHost: string, private cardRequest: CardRequest) {
        super(serviceHost);
    }

    async deposit({ amount, date }: { amount: number; date?: Date | undefined; }) {
        return await this.createTransaction({
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
    async withdraw(options: { amount: number; date?: Date | undefined; }) {
        return await this.createTransaction({
            cardRequest: this.cardRequest,
            method: 'CREDIT_CARD',
            type: 'WITHDRAWAL',
            description: 'Credit card withdrawal',
            ...options
        });
    }
    
    async payBill(options: { amount: number; billerCode: string; billerName: string; date?: Date | undefined; }) {
        return await this.createTransaction({
            cardRequest: this.cardRequest,
            method: 'CREDIT_CARD',
            type: 'PAYMENT',
            description: 'Credit card payment',
            ...options
        });
    }

    async purchase(options: { amount: number; merchantName: string; merchantCode: string; description: string; date?: Date | undefined; }) {
        return await this.createTransaction({
            cardRequest: this.cardRequest,
            method: 'CREDIT_CARD',
            type: 'PURCHASE',
            ...options
        });
    }
}