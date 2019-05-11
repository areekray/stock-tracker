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
  @Input() stock: IStock;
  @Input() stockDataPoints: number[];
  @Input() stockTimes: any[];
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
  }

  ngOnChanges() {
    //this.getStockHistory();
    this.lineChartData = [
      { data: this.stockDataPoints.length > 10 ? this.stockDataPoints.slice(Math.max(this.stockDataPoints.length - 10, 1)) : this.stockDataPoints, label: 'DataPoint' }
    ];
    this.lineChartLabels = this.stockTimes.length > 10 ? this.stockTimes.slice(Math.max(this.stockTimes.length - 10, 1)) : this.stockTimes;
  }

  stopTracking() {
    this.appService.trackingStock = null;
    this.appService.resetTracking();
  }

 
}
