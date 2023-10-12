import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { authorizationGuard } from 'src/app/core/guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [authGuard, authorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
