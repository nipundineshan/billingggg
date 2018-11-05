import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addItems(){
    console.log('in add itemssssssss');

    window.fs.readFile('stocks.json', (err, data) => {
      console.log('in read fileeeeeee');
      console.log(err, data);
      
      if (err) {
        throw err
      };
      console.log('data >>>>> '+data);
    });
    
    window.fs.writeFile("saample.txt", "Hey there!", function(err) {
      if(err) {
          return console.log(err);
      }
  
      console.log("The file was saved!");
  }); 
  }

}
