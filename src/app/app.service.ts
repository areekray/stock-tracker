import { Injectable } from '@angular/core';
import { Subject, Observable, Observer, BehaviorSubject } from 'rxjs';
import { IStock } from './interfaces/IStock';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  stocks: IStock[] = [];
  stockDataPoints: number[] = [];
  stockTimes: string[] = [];
  interval: any;
  trackingStock: IStock;
  constructor() { }

  resetTracking() {
    this.stockDataPoints = [];
    this.stockTimes = [];
    if(this.interval) { clearInterval(this.interval); }
  }

  trackStock() {    
    let num = Math.floor(Math.random()*90000) + 10000;
    this.stockDataPoints.push(num);
    this.updateStockPrice(num);
    this.stockTimes.push(this.formatTime(new Date()));
    this.updateStockStartDate(new Date());
    this.interval = setInterval(() => {
      let num = Math.floor(Math.random()*90000) + 10000;
      this.stockDataPoints.push(num);
      this.updateStockPrice(num);
      this.stockTimes.push(this.formatTime(new Date()));
    }, 15000);
  }

  formatTime(date: Date): string {
    let hr = date.getHours();
    let min = date.getMinutes().toString();
    let sec = date.getSeconds().toString();
    let ampm = 'am';
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    if (parseInt(min) < 10) {
        min = "0" + min;
    }
    if (parseInt(sec) < 10) {
        sec = "0" + sec;
    }
    return `${hr}:${min}:${sec} ${ampm}`;
  }

  updateStockPrice(num: number) {
    this.stocks.some((item: IStock) => {
      if(item.name === this.trackingStock.name) {
        item.difference = item.price ? num - item.price : 0;
        item.price = num;
        return true;
      }
    });
  }

  updateStockStartDate(date: Date) {
    this.stocks.some((item: IStock) => {
      if(item.name === this.trackingStock.name) {
        item.timeStamp = date;
        return true;
      }
    });
  }

}
