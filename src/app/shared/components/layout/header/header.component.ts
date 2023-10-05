import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/store/auth.actions';
import { Route, Router } from '@angular/router';
import { selectIsAuth } from 'src/app/auth/store/auth.selectors';
import { NgIf } from '@angular/common';
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

  constructor(private store: Store, private router: Router) {
    console.log('is auth form constructor ?', this.isAuth);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select(selectIsAuth).subscribe((isAuth) => {
      console.log('is auth?: ', isAuth);
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
