import { CreateTransaction } from "../models/create-transaction.model";
import axios from 'axios';
import { LoggerUtil } from "../util/logger.util";


export abstract class TransactionService {

    log = LoggerUtil.getLogger('TransactionService');

    async createTransaction(serviceHost: string, request: CreateTransaction) {
        try {
            const res = await axios.post(`${serviceHost}/api/transactions`, request);
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

}