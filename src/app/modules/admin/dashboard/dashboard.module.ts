import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SummaryItemComponent } from './components/summary-item/summary-item.component';
import { TabsContentComponent } from './components/tabs-content/tabs-content.component';
import { TableOrdersComponent } from './components/tabs-content/components/table-orders/table-orders.component';
import { ConfirmDialogComponent } from './components/tabs-content/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardComponent,
    SummaryItemComponent,
    TabsContentComponent,
    TableOrdersComponent,
  ],
})
export class DashboardModule {}
