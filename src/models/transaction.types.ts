import { AxiosResponse } from "axios";
import { TransactionResponse } from "./transaction-response.model";

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'PURCHASE' | 'PAYMENT' | 'REFUND';
export type TransactionMethod = 'ACH' | 'ATM' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'APP';
export type TransactionStatus = 'APPROVED' | 'PENDING' | 'DENIED';
export type AxiosTransactionPromise = Promise<AxiosResponse<TransactionResponse, any>>;