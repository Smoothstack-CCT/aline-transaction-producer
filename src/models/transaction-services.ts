import { CreditTransactionService } from "../services/credit.transaction.service";
import { AchTransactionService } from "../services/ach.transaction.service";
import { DebitTransactionService } from "../services/debit.transaction.service";

export type TransactionServices = {
    achService: AchTransactionService;
    creditService?: CreditTransactionService;
    debitService?: DebitTransactionService;
};