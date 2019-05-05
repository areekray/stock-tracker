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
    this.appService.startWorker();
    this.subsription = this.appService.connect().subscribe((response: MessageEvent) => {
      this.appService.configureData(this.appService.stocksList, JSON.parse(response.data)).then((updatedStockList: any) => {
        this.appService.stocksList = updatedStockList;
        this.appService.storeData(updatedStockList).then(() => {
          this.appService.checkStockHistory.next(true);
        }).catch(err => { console.log(err) })
      })
    }, err => {
      this.error = true;
      console.log(err);
    })
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
    this.appService.terminateWorker();
  }

  refreshSelectedStocks(stocks: IStock[]) {
    this.selectedStocks = stocks;
  }
}
