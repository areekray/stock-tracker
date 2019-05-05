import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDashboardComponent } from './page/stock-dashboard/stock-dashboard.component';
import { StocksListComponent } from './components/stocks-list/stocks-list.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { TimeIntervalPipeModule } from 'src/app/pipes/time-interval/time-interval.pipe.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [StockDashboardComponent, StocksListComponent, StockDetailsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TimeIntervalPipeModule,
    ChartsModule
  ]
})
export class DashboardModule { }
