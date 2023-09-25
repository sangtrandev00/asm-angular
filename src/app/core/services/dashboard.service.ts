import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BACKEND_DOMAIN } from 'src/app/constant/base-url';
import { IReport } from 'src/app/models/Report';

export interface getReportsResponse {
  reports: IReport;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getReports(): Observable<getReportsResponse> {
    return this.http
      .get<getReportsResponse>(`${BACKEND_DOMAIN}/admin/reports/summary`)
      .pipe(
        map((reports) => {
          return reports || {};
        })
      );
  }
}
