import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  MatProgressSpinnerModule,
  MatSpinner,
} from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { TableOrdersComponent } from './components/table-orders/table-orders.component';
export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-tabs-content',
  templateUrl: './tabs-content.component.html',
  styleUrls: ['./tabs-content.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatTabsModule,
    NgFor,
    AsyncPipe,
    MatProgressSpinnerModule,
    TableOrdersComponent,
  ],
})
export class TabsContentComponent {
  constructor(private store: Store) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
