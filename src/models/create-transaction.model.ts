import { CardRequest } from "./card-request.model";

export interface CreateTransaction {
    type: 'DEPOSIT' | 'WITHDRAWAL' | 'PURCHASE' | 'PAYMENT' | 'REFUND';
    method: 'ACH' | 'ATM' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'APP';
    date: Date;
    amount: number;
    merchantCode: string;
    merchantName: string;
    description: string;
    cardRequest: CardRequest;
    accountNumber: string;
    hold: boolean;
}