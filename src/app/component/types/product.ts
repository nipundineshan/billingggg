export class Product {
  particulars:string;
  hsnsac:string;
  qty:number;
  unit:string;
  rate:number;
  amount:number;
  cgstAmount:number;
  sgstAmount:number;
  taxTotal:number;
  total:number;

  constructor({particulars, hsnsac, qty, unit, rate, cgst, sgst}){
    this.particulars = particulars;
    this.hsnsac = hsnsac;
    this.qty = qty;
    this.unit = unit;
    this.rate = rate;

    this.amount = qty * rate;
    this.cgstAmount = this.getPercentage(cgst, this.amount);
    this.sgstAmount = this.getPercentage(sgst, this.amount);
    this.taxTotal = this.cgstAmount + this.sgstAmount;
    this.total = this.amount + this.taxTotal;
  }

  getPercentage(percentage, amount){
    return (amount/100) * percentage;
  }
}