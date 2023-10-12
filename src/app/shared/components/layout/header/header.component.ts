import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { AuthActions, AuthApiActions } from 'src/app/auth/store/auth.actions';
import { Route, Router } from '@angular/router';
import {
  selectCurrentUserId,
  selectIsAuth,
  selectToken,
} from 'src/app/auth/store/auth.selectors';
import { NgIf } from '@angular/common';
import { UsersApiActions } from 'src/app/modules/admin/users/store/users.actions';
import { selectCurrentUser } from 'src/app/modules/admin/users/store/users.selectors';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, NgIf],
})
export class HeaderComponent {
  @Output() toggleSideBarEvent = new EventEmitter();

  isAuth: boolean = false;
  name: string = 'Sang';
  constructor(
    private store: Store,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    // Get userId:

    this.store.select(selectToken).subscribe((token) => {
      const decodedToken = this.jwtHelper.decodeToken(token);

      this.store.dispatch(
        UsersApiActions.getUserById({ userId: decodedToken.userId })
      );
      this.store.select(selectCurrentUser).subscribe((user) => {
        this.name = user?.name || '';
      });
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select(selectIsAuth).subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  toggleSideBar() {
    this.toggleSideBarEvent.emit();
  }

  logout() {
    window.alert('Logout successfully!');
    this.store.dispatch(AuthActions.setUnAuthenticated());
    this.router.navigate(['/auth/login']);
  }

  navigateTo(routePath: string) {
    this.router.navigate([routePath]);
  }
}
