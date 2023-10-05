import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { TableOrdersComponent } from './components/table-orders/table-orders.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CurrencyPipe } from '@angular/common';
@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TableOrdersComponent,
    ConfirmDialogComponent,
  ],
  providers: [CurrencyPipe, DatePipe],
})
export class OrdersModule {}
