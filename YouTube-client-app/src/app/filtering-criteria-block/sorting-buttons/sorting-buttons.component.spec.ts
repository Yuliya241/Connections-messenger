import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingButtonsComponent } from './sorting-buttons.component';

describe('SortingButtonsComponent', () => {
  let component: SortingButtonsComponent;
  let fixture: ComponentFixture<SortingButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingButtonsComponent],
    });
    fixture = TestBed.createComponent(SortingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
