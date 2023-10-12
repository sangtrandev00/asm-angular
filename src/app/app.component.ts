import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthActions, AuthApiActions } from './auth/store/auth.actions';
import { selectCurrentUserId, selectIsAuth } from './auth/store/auth.selectors';
import { UsersApiActions } from './modules/admin/users/store/users.actions';
import { selectCurrentUser } from './modules/admin/users/store/users.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-asm';
  isAuth = false;
  constructor(
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
    private store: Store
  ) {
    this.store.select(selectIsAuth).subscribe((isAuth) => {
      this.isAuth = isAuth;
      const token = localStorage.getItem('token') as string;

      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.store.dispatch(
          UsersApiActions.getUserById({ userId: decodedToken.userId })
        );
      }
    });
  }

  ngOnInit() {
    if (this.jwtHelper.isTokenExpired()) {
      console.log('token expired');

      this.store.dispatch(AuthActions.setUnAuthenticated());
    } else {
      console.log('token not expired');
      this.store.dispatch(AuthActions.setAuthenticated());
    }
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
