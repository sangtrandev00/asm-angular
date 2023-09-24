import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/store/auth.actions';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class HeaderComponent {
  @Output() toggleSideBarEvent = new EventEmitter();

  constructor(private store: Store, private router: Router) {}

  toggleSideBar() {
    this.toggleSideBarEvent.emit();
  }

  logout() {
    window.alert('Logout successfully!');
    this.store.dispatch(AuthActions.setUnAuthenticated());
  }

  navigateTo(routePath: string) {
    this.router.navigate([routePath]);
  }
}
