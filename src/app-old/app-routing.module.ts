import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillingComponent } from './component/billing/billing.component';
import { StockComponent } from './component/stock/stock.component';

const routes: Routes = [
  { path: '', redirectTo: '/billing', pathMatch: 'full' },
  { path: 'stock', component: StockComponent },
  { path: 'billing', component: BillingComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
