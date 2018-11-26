import { Component } from '@angular/core';
import { StockService } from './service/stock.service';
import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private stockService: StockService, private configService : ConfigService) { }

  ngOnInit() {
    this.stockService.loadStockData();
    this.configService.getConfig().subscribe();
  }

}


