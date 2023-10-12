import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthActions, AuthApiActions } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-asm';

  constructor(
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
    private store: Store
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token') as string;

    console.log(
      'this.jwtHelper.decodeToken(token): ',
      this.jwtHelper.decodeToken(token)
    ); // token); // token

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
