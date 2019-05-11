import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IStock } from 'src/app/interfaces/IStock';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.scss']
})
export class StockDashboardComponent implements OnInit {
  subsription: Subscription;
  selectedStocks: IStock[] = [];
  error: boolean = false;
  constructor(public appService: AppService) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  refreshSelectedStocks(stocks: IStock[]) {
    this.selectedStocks = stocks;
  }

  addStock(stockName: string) {
    this.appService.stocks.push({
      name: stockName,
      timeStamp: null,
      price: null,
      difference: null
    })
  }

  trackStock(stock: IStock) {
    this.appService.resetTracking();
    this.appService.trackingStock = stock;
    this.appService.trackStock();
  }
}
