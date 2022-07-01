import { TransactionService } from "./transaction.service";

export class AchTransactionService extends TransactionService {

    constructor(serviceHost: string, private accountNumber: string) {
        super(serviceHost);
    }

    async deposit(options: {amount: number, date: Date}) {
        return await this.createTransaction({
            accountNumber: this.accountNumber,
            type: "DEPOSIT",
            method: "ACH",
            ...options,
            merchantCode: "ALINE",
            merchantName: "Aline Financial",
            description: "Electronic deposit"
        });
    }

    async payBill({ date, ...options}: { amount: number; billerCode: string; billerName: string; date?: Date; }) {
        return await this.createTransaction({
            accountNumber: this.accountNumber,
            type: "PAYMENT",
            method: "ACH",
            date: date ? date : new Date(),
            ...options,
            description: "Bill payment"
        });
    }
    

    async withdraw(options: {amount: number, date: Date}) {
        return await this.createTransaction({
            accountNumber: this.accountNumber,
            type: "WITHDRAWAL",
            method: "ACH",
            ...options,
            description: "Withdrawal"
        });
    }

    async purchase(options: { amount: number; merchantName: string; merchantCode: string; description: string; date: Date; }) {
        return await this.createTransaction({
            accountNumber: this.accountNumber,
            type: "PURCHASE",
            method: "ACH",
            ...options
        });
    }

}