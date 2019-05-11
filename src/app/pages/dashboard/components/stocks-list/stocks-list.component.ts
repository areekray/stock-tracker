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
  @Input() trackingStock: IStock;
  @Output() addStockEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() trackStockEvent: EventEmitter<IStock> = new EventEmitter<IStock>();
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

  trackStock(stock: IStock) {
    this.trackStockEvent.emit(stock);
  }

  addStock(stockName: string) {
    this.addStockEvent.emit(stockName);
  }

}
