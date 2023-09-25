import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectReports } from './store/dashboard.selectors';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardApiActions } from './store/dashboard.actions';
import { IReport } from 'src/app/models/Report';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  reports!: IReport;
  constructor(
    private store: Store,
    private dashboardService: DashboardService
  ) {
    console.log('store init at dashboard');

    this.store.select(selectReports).subscribe((reports) => {
      console.log(reports);
    });
  }

  ngOnInit() {
    this.dashboardService.getReports().subscribe((data) => {
      console.log(data);

      this.reports = data.reports;

      this.store.dispatch(
        DashboardApiActions.getReports({ reports: data.reports })
      );
    });
  }
}
