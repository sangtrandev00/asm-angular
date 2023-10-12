import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { isAdminGuard } from 'src/app/core/guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [authGuard, isAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
