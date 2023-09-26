import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectLoading, selectReports } from '../../store/dashboard.selectors';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatIconModule],
})
export class SummaryItemComponent {
  @Input() report: number = 0;
  @Input() name: string = 'Orders';
  @Input() image: string = '';

  constructor(private store: Store) {
    console.log('reports: ', this.report);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log('reports: ', this.report);
    console.log('name: ', this.name);
    this.image = this.transformImage(this.name);

    this.store.select(selectReports).subscribe((reports) => {
      console.log('reports from store ', reports);
      console.log('name: ', this.name);

      if (this.name === 'Orders') {
        this.report = reports.orders;
      } else if (this.name === 'Total Revenue') {
        this.report = reports.totalRevenue;
      } else if (this.name === 'Products') {
        this.report = reports.products;
      } else if (this.name === 'Users') {
        this.report = reports.users;
      }
    });
  }

  transformImage(name: string): string {
    switch (name) {
      case 'Orders':
        return 'shop';
      case 'Total Revenue':
        return 'attach_money';
      case 'Products':
        return 'shopping_basket';
      case 'Users':
        return 'supervised_user_circle';
      default:
        return 'shop';
    }
  }
}
