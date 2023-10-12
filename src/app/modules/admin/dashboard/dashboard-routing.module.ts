import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { isAdminGuard } from 'src/app/core/guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard, isAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
