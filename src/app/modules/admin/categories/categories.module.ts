import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CategoriesRoutingModule, CategoriesComponent],
})
export class CategoriesModule {}
