import { Component, OnInit } from '@angular/core';
import { GenerateRequest } from './interfaces/generate-request';
import { TransactionService } from './services/transaction.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-transaction-generator',
  templateUrl: './transaction-generator.component.html',
  styleUrls: ['./transaction-generator.component.css']
})
export class TransactionGeneratorComponent {

  minDate: string;
  maxDate: string;

  generating = false;

  generateRequest: GenerateRequest = {
    startDate: dayjs().add(-1, 'day').format('YYYY-MM-DD'),
    accountNumber: ''
  };
  
  
  constructor(private transactionService: TransactionService) {
    this.minDate = dayjs().add(-90, 'day').format('YYYY-MM-DD');
    this.maxDate = dayjs().add(-1, 'day').format('YYYY-MM-DD');
  }

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

  get daysToSimulate(): number {
    return dayjs().diff(this.generateRequest.startDate, 'days') || 1;
  }

}
