import { TransactionService } from "./transaction.service";

export class AchTransactionService extends TransactionService {

    hasSavings = false;

    constructor(serviceHost: string, private accountNumber: string, private savingsAccountNumber?: string) {
        super(serviceHost);
        this.hasSavings = !!savingsAccountNumber;
    }

    deposit(options: {amount: number, date: Date}) {
        return this.createTransaction({
            accountNumber: this.accountNumber,
            type: "DEPOSIT",
            method: "ACH",
            ...options,
            merchantCode: "ALINE",
            merchantName: "Aline Financial",
            description: "Electronic deposit"
        });
    }

    payBill({ date, ...options}: { amount: number; merchantCode: string; merchantName: string; date?: Date; }) {
        return this.createTransaction({
            accountNumber: this.accountNumber,
            type: "PAYMENT",
            method: "ACH",
            date: date ? date : new Date(),
            ...options,
            description: "Bill payment"
        });
    }
    

    withdraw(options: {amount: number, date: Date}) {
        return this.createTransaction({
            accountNumber: this.accountNumber,
            type: "WITHDRAWAL",
            method: "ACH",
            ...options,
            description: "Withdrawal"
        });
    }

    purchase(options: { amount: number; merchantName: string; merchantCode: string; description: string; date: Date; }) {
        return this.createTransaction({
            accountNumber: this.accountNumber,
            type: "PURCHASE",
            method: "ACH",
            ...options
        });
    }
    
    transferToSavings(options: { amount: number, date: Date }) {
        if (!this.savingsAccountNumber) {
            this.log.error('Savings account was not provided to the service.');
            return null;
        }
        return this.transferFunds({
            ...options,
            fromAccountNumber: this.accountNumber,
            toAccountNumber: this.savingsAccountNumber
        });
    }

}