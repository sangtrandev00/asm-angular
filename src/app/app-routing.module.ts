import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin/categories',
    loadChildren: () =>
      import('./modules/admin/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'admin/products',
    loadChildren: () =>
      import('./modules/admin/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'admin/users',
    loadChildren: () =>
      import('./modules/admin/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'admin/orders',
    loadChildren: () =>
      import('./modules/admin/orders/orders.module').then(
        (m) => m.OrdersModule
      ),
  },
  {
    path: 'admin/dashboard',
    loadChildren: () =>
      import('./modules/admin/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
