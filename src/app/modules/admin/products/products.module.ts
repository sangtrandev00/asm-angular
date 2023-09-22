import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableProductsComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ProductDialogComponent,
    ConfirmDialogComponent,
  ],
  providers: [CurrencyPipe],
})
export class ProductsModule {}
