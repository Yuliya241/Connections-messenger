import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchInputComponent],
    });
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changeText', () => {
    jest.spyOn(component.changeText, 'emit');
    expect(component.changeText.emit).not.toHaveBeenCalled();
  });

  it('should call search', () => {
    const mySpy = jest.spyOn(component.changeText, 'emit');
    component.search();
    expect(mySpy).toHaveBeenCalledTimes(1);
  });
});
