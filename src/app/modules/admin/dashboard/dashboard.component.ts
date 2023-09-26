import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoading, selectReports } from './store/dashboard.selectors';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardApiActions } from './store/dashboard.actions';
import { IReport } from 'src/app/models/Report';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SummaryItemComponent } from './components/summary-item/summary-item.component';
import { TabsContentComponent } from './components/tabs-content/tabs-content.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    SummaryItemComponent,
    TabsContentComponent,
    NgIf,
  ],
})
export class DashboardComponent {
  reports!: IReport;
  isDashboardLoading: boolean = false;
  constructor(
    private store: Store,
    private dashboardService: DashboardService
  ) {
    console.log('store init at dashboard');

    this.store.select(selectReports).subscribe((reports) => {
      console.log('reports from store ', this.reports);

      this.reports = reports;
    });

    this.store.select(selectLoading).subscribe((isLoading) => {
      console.log('loading: ', isLoading);

      this.isDashboardLoading = isLoading;
    });
  }

  ngOnInit() {
    this.dashboardService.getReports().subscribe((data) => {
      console.log('data reports: ', data);

      this.reports = data.reports;

      this.store.dispatch(
        DashboardApiActions.getReports({ reports: data.reports })
      );
    });
  }
}
