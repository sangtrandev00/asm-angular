import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import {
  selectCurrentRole,
  selectToken,
} from 'src/app/auth/store/auth.selectors';
import { UsersApiActions } from 'src/app/modules/admin/users/store/users.actions';
import { selectCurrentUser } from 'src/app/modules/admin/users/store/users.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor,
  ],
})
export class SideBarComponent {
  links = [1, 2, 3, 4];
  currentRole = 'admin';
  constructor(
    private route: Router,
    private jwtHelper: JwtHelperService,
    private store: Store
  ) {
    this.store.select(selectToken).subscribe((token) => {
      const decodedToken = this.jwtHelper.decodeToken(token);

      console.log('decodedToken: ', decodedToken);

      this.store.dispatch(
        UsersApiActions.getUserById({ userId: decodedToken.userId })
      );
      this.store.select(selectCurrentUser).subscribe((user) => {
        this.currentRole = user?.role || 'admin';
      });
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.store.select(selectCurrentRole).subscribe((currentRole) => {
      this.currentRole = currentRole;
    });
  }

  navigateTo(routePath: string) {
    this.route.navigate([routePath]);
  }
}
