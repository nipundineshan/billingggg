import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  selectedItems = [];
  selectedItems1 = [1, 2, 3]
  itemModel;
  availableItems = [];
  some = "aaaaaaaaaa";
  sel;
  itemMap = {};
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
  constructor() { }

  ngOnInit() {
    // try{
    //   window.fs.readFile('stocks.json', (err, data) => {
    //     console.log('in read fileeeeeee');
    //     console.log(err, data);
    //   //  this.availableItems = JSON.parse(data);
    //     if (err) {
    //       throw err
    //     };
    //     console.log('data >>>>> '+data);
    //   });
    // }catch(err){
    //   console.log(err);

    // }


    this.availableItems = [{
      "particulars": "name123",
      "hsnsac": "model12",
      "unit": "100",
      "rate": 50
    },
    {
      "particulars": "2222",
      "hsnsac": "3333",
      "unit": "100",
      "rate": 24
    }];

    this.availableItems.forEach(element => {
      this.itemMap[element.hsnsac] = element;
      this.itemModel = this.itemMap[0];
    });



  }
  addItems() {
    if (!this.selectedProducts) {
      this.selectedProducts = [];
    }
    console.log(this.itemModel)
    console.log(this.count)
    let qty = this.count;

    let selectedGoods = this.itemMap[this.itemModel];


    let { particulars, hsnsac, unit, rate } = selectedGoods;
    let [cgst, sgst] = [this.cgst, this.sgst]

    let prod = new Product({ particulars, hsnsac, unit, rate, qty, cgst, sgst })
    this.selectedProducts.push(prod)
    console.log(JSON.stringify(this.selectedItems));

    this.totalQty = this.totalQty + qty;
    this.totalAmount = this.totalAmount + prod.amount;
    this.totalCgst = this.totalCgst + prod.cgstAmount;
    this.totalSgst = this.totalSgst + prod.sgstAmount;
    this.totalTax = this.totalTax + prod.taxTotal;
    this.finalAmountGst = this.finalAmountGst + prod.total;

    //   console.log('in add itemssssssss'); 

    //   window.fs.writeFile("saample.txt", "Hey there!", function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("The file was saved!");
    // }); 
  }

}
