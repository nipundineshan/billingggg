import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../service/billing.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-bill-address',
  templateUrl: './bill-address.component.html',
  styleUrls: ['./bill-address.component.css']
})
export class BillAddressComponent implements OnInit {

  invoiceNumber;
  date;
  modeOfPay;
  poNumber;
  transport;
  address: string[];

  constructor(private billingService: BillingService, private configService: ConfigService) { }

  ngOnInit() {

    this.configService.getConfig().subscribe((conf) => {
      let { address, email, phoneNumber, modeOfPay, transport, poNumber} = conf;
     this.modeOfPay = modeOfPay;
     this.transport = transport;
     this.poNumber = poNumber;
      this.address = address;
    });

    this.date = new Date();
    this.billingService.getInvoiceNumber(false).subscribe(invoiceNumber => {
      this.invoiceNumber = 'i2c-1' + new Date().getTime() + '-' + invoiceNumber;
    });

    // this.address = ["Sudinam products","S.N. Puram, Vadakkumbad","PO Ummanchira, Thalassery",
    //   "Kannur-670649"];

  }


  // getInvoiceNumber(){
  //   return 'i2c-1'+ new Date().getTime() +'-'+ this.billingService.getNextBillinNumber();
  // }

}
