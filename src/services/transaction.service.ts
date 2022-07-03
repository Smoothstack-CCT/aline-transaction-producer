import { CreateTransaction } from "../models/create-transaction.model";
import axios, { AxiosResponse } from 'axios';
import { LoggerUtil } from "../util/logger.util";
import { TransactionResponse } from "../models/transaction-response.model";
import { AxiosTransactionPromise } from "../models/transaction.types";


export abstract class TransactionService {

    log = LoggerUtil.getLogger('TransactionService');

    constructor(private serviceHost: string) {}

    createTransaction(request: CreateTransaction): AxiosTransactionPromise {
        return axios.post<TransactionResponse>(`${this.serviceHost}/api/transactions`, request);
    }

    abstract deposit(options: { amount: number, date?: Date }): AxiosTransactionPromise;
    abstract withdraw(options: { amount: number, date?: Date }): AxiosTransactionPromise;
    abstract payBill(options: { amount: number, merchantCode: string; merchantName: string, date?: Date }): AxiosTransactionPromise;
    abstract purchase(options: { amount: number, merchantName: string, merchantCode: string, description: string, date?: Date }): AxiosTransactionPromise;


}