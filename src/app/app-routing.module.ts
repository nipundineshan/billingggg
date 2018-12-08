import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillingComponent } from './component/billing/billing.component';
import { StockComponent } from './component/stock/stock.component';
import { HomeComponent } from './component/home/home.component';
import { B2bComponent } from './component/b2b/b2b.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'stock', component: StockComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'b2b', component: B2bComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
