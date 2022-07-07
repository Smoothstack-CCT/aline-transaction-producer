import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../interfaces/auth-request';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  login(request: AuthRequest) {
    return this.http.post<any>('/login', { ...request }, {
      observe: 'response'
    });
  }

  performLogin(res: HttpResponse<Object>) {
    const { headers } = res;

    const token = headers.get('authorization');

    if (!token)
      throw new Error('Unable to save token. Token does not exist in the headers.');

    localStorage.setItem('jwt', token);
    this.router.navigateByUrl('/');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }

  get jwt(): string | null {
    return localStorage.getItem('jwt');
  }

  get tokenIsValid(): boolean {

    if (!this.jwt)
      return false;

    const { exp }: {
      sub: string;
      authority: string;
      iat: number;
      exp: number;
    } = jwtDecode(this.jwt);

    const date = new Date(exp * 1000);

    return !!this.jwt && (date >= new Date());
  }

  get loggedIn(): boolean {
    return !!this.jwt && this.tokenIsValid;
  }
}
