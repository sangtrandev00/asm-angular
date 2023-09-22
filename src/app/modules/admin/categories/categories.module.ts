import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TableCategoriesComponent } from './components/table-categories/table-categories.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    // ConfirmDialogComponent,
    // CategoryDialogComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    TableCategoriesComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ConfirmDialogComponent,
    CategoryDialogComponent,
    // CategoryDialogComponent,
    // ConfirmDialogComponent,
  ],
})
export class CategoriesModule {}
