import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductListComponent,
    ProductsRoutingModule,
    TableProductsComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [CurrencyPipe],
})
export class ProductsModule {}
