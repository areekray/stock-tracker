import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { IStock } from 'src/app/interfaces/IStock';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit, OnDestroy {
  @Input() stocksList: IStock[] = [];
  @Output() selectedStocksEvent: EventEmitter<IStock[]> = new EventEmitter<IStock[]>();
  selectedStocks: IStock[] = [];
  counter: Subscription;
  currentTime: Date;
  selectMultple: boolean = false;

  constructor() { }

  ngOnInit() {
    this.counter = timer(0,3000).subscribe(() => {
      //alert('timer');
      this.currentTime = new Date();
    })
  }

  ngOnDestroy() {
    if(this.counter) { this.counter.unsubscribe(); }
  }

  selectStock(stock: IStock) {
    let stockIndex = this.findIndexOf(this.selectedStocks, stock);
    if (stockIndex >= 0) {
      if (this.selectMultple) {
        this.selectedStocks.splice(stockIndex, 1);
      }
    } else if (!this.selectMultple && this.selectedStocks.length > 0) {
      this.selectedStocks = [];
      this.selectedStocks.push(stock);
    } else {
      this.selectedStocks.push(stock);
    }
    this.selectedStocksEvent.emit(this.selectedStocks);
  }
  
  findIndexOf(stocks: IStock[], stock: IStock): number {
    let stockIndex = -1;
    stocks.some((item: IStock, index: number) => {
      if(item.name === stock.name) {
        stockIndex = index;
        return true;
      }
    });
    return stockIndex;
  }

}
