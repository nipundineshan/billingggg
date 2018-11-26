import { Injectable } from '@angular/core';
import { Goods } from '../types/goods';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stockFileName: string = 'config/stocks.json';
  stockData: Goods[];
  pendingPromise;

  constructor() {

  }

  getStockData(): Promise<Goods[]> {
    return new Promise((resolve, reject) => {
      if (this.stockData) {
        resolve(this.stockData);
      } else {
        this.pendingPromise = resolve;
      }

    });
  }

  loadStockData(): Promise<Goods[]> {
    return new Promise((resolve, reject) => {
      try {
        window.fs.readFile(this.stockFileName, (err, data) => {
          console.log('in read fileeeeeee');
          console.log(err, data);
          if (err) {
            throw err
          };
          console.log('data >>>>> ' + data);
          this.stockData = JSON.parse(data)
          if (this.pendingPromise) {
            this.pendingPromise(this.stockData);
          }
          resolve(this.stockData);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }


  addStockData(newItem) {
    return new Promise((resolve, reject) => {
    let updated = false;
    for (let index = 0; index < this.stockData.length; index++) {
      const element = this.stockData[index];
      if (element.hsnsac == newItem.hsnsac) {
        updated = true;
        element.particulars = newItem.particulars;
        element.qty = element.qty + newItem.qty;
        element.unit = newItem.unit;
        element.rate = newItem.rate;
      }
    }
    let item: Goods;
    if (!updated) {
      this.stockData.push(newItem);
    }

    let stockData = JSON.stringify(this.stockData);
    window.fs.writeFile(this.stockFileName, stockData, (err) => {
      if (err) {
        reject(err);
      }
      resolve("The file was saved!");
    });

  });
  }


  updateStockData(updateStock) {
    return new Promise((resolve, reject) => {
      this.stockData = updateStock;
    let stockData = JSON.stringify(updateStock);
    window.fs.writeFile(this.stockFileName, stockData, (err) => {
      if (err) {
        reject(err);
      }
      resolve("The file was saved!");
    });

  });
  }

}
