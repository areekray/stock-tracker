import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockDashboardComponent } from './page/stock-dashboard/stock-dashboard.component';
import { StocksListComponent } from './components/stocks-list/stocks-list.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { TimeIntervalPipeModule } from 'src/app/pipes/time-interval/time-interval.pipe.module';
import { ChartsModule } from 'ng2-charts';
import { AddNewStockComponent } from './components/add-new-stock/add-new-stock.component';

@NgModule({
  declarations: [StockDashboardComponent, StocksListComponent, StockDetailsComponent, AddNewStockComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    TimeIntervalPipeModule,
    ChartsModule
  ]
})
export class DashboardModule { }
