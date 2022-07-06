import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../interfaces/auth-request';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(request: AuthRequest) {
    return this.http.post('/login', { ...request }, {
      observe: 'response'
    });
  }

  performLogin(res: HttpResponse<Object>) {
    const { headers } = res;

    console.log(headers);


  }

  get jwt(): string | null {
    return localStorage.getItem('jwt');
  }

  get tokenIsValid(): boolean {

    if (!this.jwt)
      return false;

    const jwt = jwtDecode(this.jwt);

    console.log(jwt);

    return !!this.jwt;
  }

  get loggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
