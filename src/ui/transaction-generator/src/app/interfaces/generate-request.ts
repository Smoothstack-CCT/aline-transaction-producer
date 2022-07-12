import { CardInfo } from "./card-info";

export interface GenerateRequest {
    startDate: string;
    accountNumber: string;
    savingsAccountNumber?: string;
    card?: CardInfo[];
}