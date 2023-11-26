import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FilterInputComponent } from './filter-input.component';

describe('FilterInputComponent', () => {
  let component: FilterInputComponent;
  let fixture: ComponentFixture<FilterInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterInputComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(FilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleTextChange', () => {
    const mySpy = jest.spyOn(component.changeText, 'emit');
    component.handleTextChange();
    expect(mySpy).toHaveBeenCalledTimes(1);
  });
});
