import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-stock',
  templateUrl: './add-new-stock.component.html',
  styleUrls: ['./add-new-stock.component.scss']
})
export class AddNewStockComponent implements OnInit {
  @Input() stocks: any[];
  stockName: string = '';
  showTextbox: boolean = false;
  @Output() addEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.showTextbox = false;
    this.addEvent.emit(this.stockName);
    this.stockName = '';
  }

  checkDisabled() {
    if(!this.stockName || this.stockName.length == 0) {
      return true;
    }
    if(this.stocks && this.stocks.length > 0) {
      let isPresent: boolean = false;
      this.stocks.some((item: any) => {
        if(this.stockName.toLowerCase() === item.name.toLowerCase()) {
          isPresent = true;
          return isPresent;
        }
      })
      return isPresent;
    }
    return false;
  }

}
