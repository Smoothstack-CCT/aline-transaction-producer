import { CreateTransaction } from "../models/create-transaction.model";
import axios from 'axios';
import { LoggerUtil } from "../util/logger.util";
import { TransactionResponse } from "../models/transaction-response.model";


export abstract class TransactionService {

    log = LoggerUtil.getLogger('TransactionService');

    constructor(private serviceHost: string) {}

    async createTransaction(request: CreateTransaction) {
        try {
            const res = await axios.post<TransactionResponse>(`${this.serviceHost}/api/transactions`, request);
            this.log.info('Posted new transaction.');
            this.log.debug(`Request Body: ${JSON.stringify(request)}`);
            this.log.debug(`Response Body: ${JSON.stringify(res.data)}`);
            return res.data;
        } catch(e: any) {
            this.log.error('Unable to create transaction.');
            this.log.error(e.response.data);
        }
        return null;
    }

    abstract deposit(options: { amount: number, date?: Date }): Promise<TransactionResponse | null>;
    abstract withdraw(options: { amount: number, date?: Date }): Promise<TransactionResponse | null>;
    abstract payBill(options: { amount: number, billerCode: string, billerName: string, date?: Date }): Promise<TransactionResponse | null>;
    abstract purchase(options: { amount: number, merchantName: string, merchantCode: string, description: string, date?: Date }): Promise<TransactionResponse | null>;


}