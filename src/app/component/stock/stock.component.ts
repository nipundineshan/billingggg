import { Component, OnInit } from '@angular/core';
import { Goods } from '../../types/goods';
import { StockService } from '../../service/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  availableGoods : Goods [];

  particulars:string;
  hsnsac:string;
  unit:string;
  rate:number;
  qty:number;
  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStockData().then((goods) => {
      console.log("goods");
      console.log(goods);
        this.availableGoods = goods
    });
  }

  addItem(){
    let item : Goods = {
      particulars:this.particulars,
      hsnsac: this.hsnsac,
      unit:this.unit,
      rate:this.rate,
      qty:this.qty
    };
    this.stockService.addStockData(item).then(() => {
      this.particulars = '';
      this.hsnsac = '';
      this.qty = 0;
      this.rate = 0;
      this.unit ='';
    });
  }

}
