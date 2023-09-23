import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, Observer } from 'rxjs';
export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-tabs-content',
  templateUrl: './tabs-content.component.html',
  styleUrls: ['./tabs-content.component.scss'],
  standalone: true,
  imports: [NgIf, MatTabsModule, NgFor, AsyncPipe],
})
export class TabsContentComponent {
  asyncTabs: Observable<ExampleTab[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'First', content: 'Content 1' },
          { label: 'Second', content: 'Content 2' },
          { label: 'Third', content: 'Content 3' },
        ]);
      }, 1000);
    });
  }
}
