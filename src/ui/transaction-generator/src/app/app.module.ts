import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TransactionGeneratorComponent } from './transaction-generator.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CardRequestComponent } from './card-request/card-request.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionGeneratorComponent,
    LoginComponent,
    CardRequestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
  }
}
