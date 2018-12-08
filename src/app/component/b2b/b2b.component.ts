import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../service/billing.service';
import { ConfigService } from '../../service/config.service';
import { StockService } from '../../service/stock.service';
import { Goods } from '../../types/goods';
import { Product } from '../../types/product';

@Component({
  selector: 'app-b2b',
  templateUrl: './b2b.component.html',
  styleUrls: ['./b2b.component.css']
})
export class B2bComponent implements OnInit {
  gstin;
  invoiceNumber;
  date;
  modeOfPay;
  poNumber;
  transport;
  address: string[];
  email;
  phone;
  itemModel;
  availableItems :Goods [] = [];
  sel;
  goodsModelsMap = {};
  count = 1;
  cgst = 6;
  sgst = 6;
  finalAmount = 0;
  finalAmountGst = 0;

  selectedProducts: Product[];
  totalQty: number = 0;
  totalAmount: number = 0;
  totalSgst: number = 0;
  totalCgst: number = 0;
  totalTax: number = 0;
productCountMap = {};
maxCount = 100;
billType = "Original";
other1:number=0;
other2:number=0;
finalAmountWithOther:number=0;

saved = false;

  constructor(private stockService: StockService,private billingService: BillingService, private configService: ConfigService) { }

  ngOnInit() {

    this.configService.getConfig().subscribe((conf) => {
      let { address, email, phoneNumber, modeOfPay, transport, poNumber,gstin} = conf;
     this.modeOfPay = modeOfPay;
     this.transport = transport;
     this.poNumber = poNumber;
      this.address = address;
    });

    this.date = new Date();
    this.billingService.getInvoiceNumber(false).subscribe(invoiceNumber => {
      this.invoiceNumber = 'i2c-1' + new Date().getTime() + '-' + invoiceNumber;
    });
    
    this.billingService.getInvoiceNumber(true).subscribe();
    this.configService.getConfig().subscribe((conf) => {
      let {address, email, phoneNumber} = conf;
     setTimeout(() => {
      this.email = email; 
      this.phone = phoneNumber; 
     }, 100);
    });

    this.stockService.getStockData().then((result) => {
      this.availableItems = result;
      console.log('this.availableItems');
      console.log(this.availableItems);

      this.availableItems.forEach(element => {
        this.goodsModelsMap[element.hsnsac] = element;
      });
      this.itemModel = this.availableItems[0].hsnsac;
    }).catch((err) => {

    });
  }

  addItems() {
   if (!this.selectedProducts) {
      this.selectedProducts = [];
    }
    console.log(this.itemModel)
    console.log(this.count)
    let qty = this.count;

   if(this.productCountMap[this.itemModel]){
    this.productCountMap[this.itemModel] = this.productCountMap[this.itemModel] + qty;
   }else{
    this.productCountMap[this.itemModel] = qty;
   }

    let selectedGoods = this.goodsModelsMap[this.itemModel];
    let { particulars, hsnsac, unit, rate } = selectedGoods;
    let [cgst, sgst] = [this.cgst, this.sgst]

    let prod = new Product({ particulars, hsnsac, unit, rate, qty, cgst, sgst })
    this.selectedProducts.push(prod)

    this.totalQty = this.totalQty + qty;
    this.totalAmount = this.totalAmount + prod.amount;
    this.totalCgst = this.totalCgst + prod.cgstAmount;
    this.totalSgst = this.totalSgst + prod.sgstAmount;
    this.totalTax = this.totalTax + prod.taxTotal;
    this.finalAmountGst = this.finalAmountGst + prod.total;
    this.finalAmountWithOther =  this.finalAmountGst + Number(this.other1)+ Number(this.other2);
    
  }

  printBill(){

      window.print();
      if( this.billType == "Duplicate"){
        this.billType = "Triplicate";
      }else {
        this.billType = "Duplicate";
      }

      if( this.saved){
        return;
    }
    this.saved = true;


    let updatedStock : Goods[] = [];

    this.stockService.getStockData().then((stocks) => {

      for (let index = 0; index < stocks.length; index++) {
        let availItems = stocks[index];        
        if(this.productCountMap[availItems.hsnsac]){
          let selectedCount = this.productCountMap[availItems.hsnsac];
          availItems.qty = availItems.qty - selectedCount;
        }
        updatedStock.push(availItems);
      }
    });

    this.saveBill();
  }

  saveBill(){
      this.billingService.saveBill(this.selectedProducts);
  }

  getAvailableQty(){
    console.log('In getAvailableQty');
    let selectedGoods = this.goodsModelsMap[this.itemModel];
    this.count = selectedGoods.qty;
    this.maxCount = this.count;
    console.log(this.count);
  }

  onSearchChange(val){
    console.log(val)
    
    this.finalAmountWithOther =  this.finalAmountGst + Number(this.other1) + Number(this.other2)    ;
  }

  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + Number(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        var value:any  = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

}
