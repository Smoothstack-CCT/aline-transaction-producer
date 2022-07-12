import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateRequest } from '../interfaces/generate-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  generateTransactions(request: GenerateRequest) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth.loggedIn ? this.auth.jwt! : ''
    });
    return this.http.post('/generate-transactions', request, {
      headers
    });
  }
}
