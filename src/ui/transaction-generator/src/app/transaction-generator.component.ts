import { Component, OnInit } from '@angular/core';
import { GenerateRequest } from './interfaces/generate-request';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-transaction-generator',
  templateUrl: './transaction-generator.component.html',
  styleUrls: ['./transaction-generator.component.css']
})
export class TransactionGeneratorComponent {

  generating = false;

  generateRequest: GenerateRequest = {
    startDate: (new Date()).toISOString().split('T')[0],
    daysToSimulate: 5,
    accountNumber: ''
  };
  
  
  constructor(private transactionService: TransactionService) {}

  generateTransactions() {
    this.generating = true;
    this.transactionService.generateTransactions(this.generateRequest).subscribe({
      complete: () => {
        this.generating = false;
      },
      next: () => {
        this.generating = false;
      },
      error: () => {
        this.generating = false;
        console.error('Unable to generate transactions...');
      }
    });
  }

}
