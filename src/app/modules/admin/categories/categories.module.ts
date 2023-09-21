import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TableCategoriesComponent } from './components/table-categories/table-categories.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent, CategoryDialogComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CategoriesComponent,
    TableCategoriesComponent,
  ],
})
export class CategoriesModule {}
