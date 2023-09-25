import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { DashboardApiActions } from './dashboard.actions'; // Updated import
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Injectable()
export class DashboardEffects {
  // Updated classname
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService, // Updated service name,
    private toastr: ToastrService
  ) {}

  getReports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardApiActions.getReports), // Updated action name
      switchMap(() =>
        this.dashboardService.getReports().pipe(
          // Updated service name
          map(({ reports }) => {
            return DashboardApiActions.getReportsSuccess({ reports }); // Updated action name
          }),
          catchError((error) => {
            return of(DashboardApiActions.getReportsFailure({ error })); // Updated action name
          })
        )
      )
    )
  );
}
