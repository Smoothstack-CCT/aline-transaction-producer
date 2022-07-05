import { CardInfo } from "./card-info";

export interface GenerateRequest {
    startDate: string;
    daysToSimulate: number;
    accountNumber: string;
    savingsAccountNumber?: string;
    card?: CardInfo[];
}