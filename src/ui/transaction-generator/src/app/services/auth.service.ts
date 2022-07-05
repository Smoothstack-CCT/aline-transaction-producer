import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../interfaces/auth-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(request: AuthRequest) {
    return this.http.post('/login', { request }, {
      observe: 'response'
    });
  }
}
