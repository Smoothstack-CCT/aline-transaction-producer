import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateRequest } from '../interfaces/generate-request';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {}

  generateTransactions(request: GenerateRequest) {
    return this.http.post('/generate-transactions', request, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
