import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AuthRequest } from '../interfaces/auth-request';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: AuthRequest = {
    username: '',
    password: ''
  };
  
  loading = false;
  error = '';

  constructor(private auth: AuthService) { }


  login() {
    this.loading = true;
    this.auth.login(this.loginForm)
      .subscribe({
        next: this.auth.performLogin,
        error: () => {
          this.loading = false;
          console.error('Unable to login. Please try again.');
        },
        complete: () => {
          this.loading = false;
        }
      });
    
  }

}
