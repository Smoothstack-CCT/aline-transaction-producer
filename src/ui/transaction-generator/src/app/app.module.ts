import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TransactionGeneratorComponent } from './transaction-generator.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AppIconsModule } from './app-icons.module';

@NgModule({
  declarations: [
    AppComponent,
    TransactionGeneratorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    AppIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
