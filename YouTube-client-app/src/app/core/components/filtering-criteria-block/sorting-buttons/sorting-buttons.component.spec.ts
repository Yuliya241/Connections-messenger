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

  it('should call orderByViews', () => {
    const mySpy = jest.spyOn(component.sortView, 'emit');
    component.orderByViews();
    expect(mySpy).toHaveBeenCalledTimes(1);
  });

  it('should call orderByDate', () => {
    const mySpy = jest.spyOn(component.sortDate, 'emit');
    component.orderByDate();
    expect(mySpy).toHaveBeenCalledTimes(1);
  });
});
