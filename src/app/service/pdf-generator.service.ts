import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'


@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

name = "Sudinam products";
fontName = "Arial";
  address = [
    "S.N. Puram, Vadakkumbad",
    "PO Ummanchira, Thalassery",
    "Kannur-670649"
];
phone =  9020992577;
gst = 67890;


  constructor() { }

  generateBillType1():void {

 


this.address.push('Ph: '+this.phone);
this.address.push('GST no: '+this.gst);

    var doc = new jsPDF()
    doc.setFont(this.fontName, "bold")
    doc.setFontSize(22)
    doc.text(70, 20, this.name)
    // doc.text(this.address, 70,16)
    doc.setFontSize(12)
    doc.setFont(this.fontName, "normal")
    doc.text(this.address, 70,27);

    ///line
    doc.setLineWidth(0.1)
    doc.line(0, 50, 220, 50)
/////////////

doc.text('Tax invoice (Cash bill)', 70,55);

doc.text('Name: ', 10,60);
doc.text('INV no: ', 160,60);
doc.text('Address: ', 10,65);
doc.text('Date: ', 160,65);
doc.text('State name & code: ', 10,70);

doc.fromHTML(
  document.getElementById("selectedItemTableId"), // HTML string or DOM elem ref.
  10, // x coord
  85, // y coord
  {
  'width': 75, // max width of content on PDF
  'elementHandlers': {}
  });

  doc.setLineWidth(0.1)
  doc.line(0, 100, 220, 50)

    doc.save('a4.pdf')
  }
}
