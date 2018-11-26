import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../service/billing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private billingService : BillingService) { }

  ngOnInit() {
    this.billingService.getInvoiceNumber(true).subscribe();
  }

}
