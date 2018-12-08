import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../service/billing.service';
import { PdfGeneratorService } from 'src/app/service/pdf-generator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private billingService : BillingService, private pdfGen : PdfGeneratorService) { }

  ngOnInit() {
    this.billingService.getInvoiceNumber(true).subscribe();
  }

  generate():void{
    this.pdfGen.generateBillType1();
  }

  printBill(){

  }

}
