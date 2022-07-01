import { CardRequest } from "./card-request.model";
import { TransactionMethod, TransactionType } from "./transaction.types";

export interface CreateTransaction {
    type: TransactionType;
    method: TransactionMethod;
    date?: Date;
    amount: number;
    merchantCode?: string;
    merchantName?: string;
    description?: string;
    cardRequest?: CardRequest;
    accountNumber?: string;
    hold?: boolean;
}