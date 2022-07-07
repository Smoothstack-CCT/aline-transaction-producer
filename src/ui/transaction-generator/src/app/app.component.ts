import { Component } from '@angular/core';
import { GenerateRequest } from './interfaces/generate-request';
import { AuthService } from './services/auth.service';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService) {}

  get loggedIn(): boolean {
    return this.auth.loggedIn;
  }

  logout() {
    this.auth.logout();
  }
}
