import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BillingComponent } from './component/billing/billing.component';
import { StockComponent } from './component/stock/stock.component';
import { AppRoutingModule } from './/app-routing.module';
import { CommonModule } from '@angular/common';
import { BillAddressComponent } from './component/bill-address/bill-address.component';
import { FooterNoticeComponent } from './component/footer-notice/footer-notice.component';
import { HomeComponent } from './component/home/home.component';
import { B2bComponent } from './component/b2b/b2b.component';
import { B2bHeaderComponent } from './component/b2b-header/b2b-header.component';

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    StockComponent,
    BillAddressComponent,
    FooterNoticeComponent,
    HomeComponent,
    B2bComponent,
    B2bHeaderComponent
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
