import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { StockService } from '../../service/stock.service';
import { Goods } from '../../types/goods';
import { ConfigService } from '../../service/config.service';
import { BillingService } from '../../service/billing.service';
import { PdfGeneratorService } from 'src/app/service/pdf-generator.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

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
address;
saved =false;
date;
invoiceNumber;

  constructor(private stockService: StockService, private configService : ConfigService, 
  private billingService : BillingService, private pdfGen : PdfGeneratorService) { }

  ngOnInit() {
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
      this.address = address;
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

  generate():void{
    this.pdfGen.generateBillType1();
  }

}
