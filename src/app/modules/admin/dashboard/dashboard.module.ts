import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SummaryItemComponent } from './components/summary-item/summary-item.component';
import { TabsContentComponent } from './components/tabs-content/tabs-content.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SummaryItemComponent, TabsContentComponent],
})
export class DashboardModule {}
