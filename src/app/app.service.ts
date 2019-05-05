import { Injectable } from '@angular/core';
import { Subject, Observable, Observer, BehaviorSubject } from 'rxjs';
import { IStock } from './interfaces/IStock';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private url: string = 'ws://stocks.mnet.website';
  private subject: Subject<MessageEvent>;
  private worker: Worker;
  private dbWorker: Worker;
  
  public stocksList: IStock[] = [];
  public checkStockHistory: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public loadUnsafeScript: boolean;

  constructor() { }

  private create(url): Subject<MessageEvent> {
    try{
      let ws = new WebSocket(url);

      let observable = Observable.create((obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });
      let observer = {
        next: (data: Object) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
          }
        }
      };
      return Subject.create(observer, observable);
    }catch(err) {
      this.loadUnsafeScript = true;
    }
    
  }

  public connect(): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(this.url);
    }
    return this.subject;
  }

  public configureData(oldStockList, newStockList): Promise<IStock> {
    return new Promise((resolve, reject) => {
      try{
        this.worker.onmessage = function (e: any) {
          resolve(e.data);
        }
        this.worker.postMessage({ oldStockList: oldStockList, newStockList: newStockList });
      }catch(err) {
        reject();
      }
    });
  }

  public storeData(stocksList : IStock[]): Promise<IStock> {
    return new Promise((resolve, reject) => {
      try{
        this.dbWorker.onmessage = function (e: any) {
          resolve(e.data);
        }
        this.dbWorker.postMessage({ action: 'store', stocks: stocksList });
      }catch(err) {
        reject();
      }
    });
  }

  public getStockHistory(stockName) {
    return new Promise((resolve, reject) => {
      try{
        this.dbWorker.onmessage = function (e: any) {
          resolve(e.data);
        }
        this.dbWorker.postMessage({ action: 'history', stockName: stockName });
      }catch(err) {
        reject();
      }
    });
  }

  public startWorker(): void {
    this.worker = new Worker('../assets/web-workers/stocks.worker.js');
    this.dbWorker =  new Worker('../assets/web-workers/stocks-db.worker.js');
  }

  public terminateWorker(): void {
    if(this.worker) { this.worker.terminate(); }
    if(this.dbWorker) { this.dbWorker.terminate(); }
  }

}
