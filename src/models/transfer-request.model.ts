export interface TransferRequest {
    fromAccountNumber: string;
    toAccountNumber: string;
    amount: number;
    memo?: string;
    date?: Date;
}