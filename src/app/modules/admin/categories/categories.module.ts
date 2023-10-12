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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/middleware/jwtInterceptor';

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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class CategoriesModule {}
