import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  invoiceNumber: number = 1;
  invoiceFileName = 'bills/.invoiceNumber.json';

  constructor() { }

  // loadInvoiceNumber(): Promise<number> {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       window.fs.readFile(this.invoiceFileName, (err, data) => {
  //         console.log('in read fileeeeeee');
  //         console.log(err, data);
  //         if (err) {
  //           throw err
  //         };
  //         console.log('invoiceNumber >>>>> ' + data);
  //         this.invoiceNumber = (JSON.parse(data).invoiceNumber)+1;
  //         resolve(this.invoiceNumber);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // }

//  onNextBillinNumber(cb) {
//   this.onInvoiceNumberUpdte = cb;
//   }

  getInvoiceNumber(reload : boolean){
    return  new Observable((observer) => {
      try {
        if(reload || this.invoiceNumber == undefined){
          window.fs.readFile(this.invoiceFileName, (err, data) => {
            console.log('in read fileeeeeee');
            console.log(err, data);
            if (err) {
              throw err
            };
            console.log('invoiceNumber >>>>> ' + data);
            let {invoiceNumber} = (JSON.parse(data));
            console.log('invoiceNumber >>>>> ' + invoiceNumber);
            this.invoiceNumber = invoiceNumber +1;
            observer.next(this.invoiceNumber);
          });
        }else{
          observer.next(this.invoiceNumber);
        }
       
      } catch (err) {
        console.log(err);
      }
    });
  }

  saveBill(selectedItems) {
    this.saveInvoiceNumber();
    return new Promise((resolve, reject) => {
      let billData = JSON.stringify(selectedItems);
      window.fs.writeFile('bills/'+'i2c-1'+ new Date().getTime() +'-'+this.invoiceNumber+'.json', billData, (err) => {
        if (err) {
          reject(err);
        }
        resolve("The file was saved!");
      });
    });
    
  }

  saveInvoiceNumber() {
    return new Promise((resolve, reject) => {
      let data  = JSON.stringify({
        invoiceNumber : this.invoiceNumber
      });
      window.fs.writeFile(this.invoiceFileName, data, (err) => {
        this.invoiceNumber = this.invoiceNumber +1;
        if (err) {
          reject(err);
        }
        resolve("The file was saved!");
      });
    });
  }
}
