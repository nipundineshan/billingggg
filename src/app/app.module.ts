import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BillingComponent } from './component/billing/billing.component';
import { StockComponent } from './component/stock/stock.component';
import { AppRoutingModule } from './/app-routing.module';
import { CommonModule } from '@angular/common';
import { BillAddressComponent } from './component/bill-address/bill-address.component';

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    StockComponent,
    BillAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
