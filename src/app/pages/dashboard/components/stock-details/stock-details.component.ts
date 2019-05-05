import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IStock } from 'src/app/interfaces/IStock';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit, OnChanges {
  @Input() stockList: IStock[] = [];
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  scales: {
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Time'
      }
    }],
    yAxes: [
      {
        id: 'y-axis-0',
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: 'Price'
        }
      }
    ]
  },
  animation: null,
  legend: null
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';


  constructor(public appService: AppService) { }

  ngOnInit() {
    this.appService.checkStockHistory.subscribe(data => {
      if(!!data) {
        this.getStockHistory();
        this.appService.checkStockHistory.next(false);
      }
    })
  }

  ngOnChanges() {
    this.getStockHistory();
  }

  getStockHistory() {
    if(!this.stockList || this.stockList.length == 0) { return; }
    this.appService.getStockHistory(this.stockList[0].name).then((stock: any) => {
      if(stock) {
        this.lineChartData = [
          { data: stock.prices.length > 10 ? stock.prices.slice(Math.max(stock.prices.length - 10, 1)) : stock.prices, label: stock.name }
        ];
        this.lineChartLabels = stock.timeStamps.length > 10 ? stock.timeStamps.slice(Math.max(stock.timeStamps.length - 10, 1)) : stock.timeStamps;
      }
    })
  }

}
