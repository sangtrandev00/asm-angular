import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class SummaryItemComponent {}
