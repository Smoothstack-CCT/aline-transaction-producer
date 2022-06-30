import { TransactionService } from "./transaction.service";
import { environment } from "../environment";

export class AchTransactionService extends TransactionService {

    async deposit(accountNumber: string, amount: number, date?: Date) {
        return await this.createTransaction(environment.serviceHost, {
            type: "DEPOSIT",
            method: "ACH",
            date: date ? date : new Date(),
            amount: 0,
            merchantCode: "ALINE",
            merchantName: "Aline Financial",
            description: "Electronic deposit"
        });
    }

    async payBill(accountNumber: string, amount: number, billerCode: string, billerName: string, date?: Date) {
        return await this.createTransaction(environment.serviceHost, {
            type: "PAYMENT",
            method: "ACH",
            date: date ? date : new Date(),
            amount: amount,
            merchantCode: billerCode,
            merchantName: billerName,
            description: "Bill payment"
        });
    }

    async withdraw(accountNumber: string, amount: number, date?: Date) {
        return await this.createTransaction(environment.serviceHost, {
            type: "WITHDRAWAL",
            method: "ACH",
            date: date ? date : new Date(),
            amount: amount,
            merchantCode: "ALINE",
            merchantName: "Aline Financial",
            description: "Withdrawal"
        });
    }

}