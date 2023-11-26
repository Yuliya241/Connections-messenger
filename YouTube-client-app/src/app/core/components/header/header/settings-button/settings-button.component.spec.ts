import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsButtonComponent } from './settings-button.component';

describe('SettingsComponent', () => {
  let component: SettingsButtonComponent;
  let fixture: ComponentFixture<SettingsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SettingsButtonComponent],
    });
    fixture = TestBed.createComponent(SettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit showFilterBlock', () => {
    jest.spyOn(component.showFilterBlock, 'emit');
    expect(component.showFilterBlock.emit).not.toHaveBeenCalled();
  });

  it('should call showFilter', () => {
    const mySpy = jest.spyOn(component.showFilterBlock, 'emit');
    component.showFilter();
    expect(mySpy).toHaveBeenCalledTimes(1);
  });
});
