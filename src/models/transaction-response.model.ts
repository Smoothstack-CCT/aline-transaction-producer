import { Merchant } from "./merchant.model";
import { TransactionMethod, TransactionStatus, TransactionType } from "./transaction.types";

export interface TransactionResponse {
    id: number;
    type: TransactionType;
    method: TransactionMethod;
    status: TransactionStatus;
    amount: number;
    description: string;
    merchantResponse: Merchant;
}