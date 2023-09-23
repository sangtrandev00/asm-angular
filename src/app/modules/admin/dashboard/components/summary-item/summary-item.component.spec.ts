import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryItemComponent } from './summary-item.component';

describe('SummaryItemComponent', () => {
  let component: SummaryItemComponent;
  let fixture: ComponentFixture<SummaryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryItemComponent]
    });
    fixture = TestBed.createComponent(SummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
