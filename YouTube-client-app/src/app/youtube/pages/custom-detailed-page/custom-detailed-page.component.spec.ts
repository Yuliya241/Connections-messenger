import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDetailedPageComponent } from './custom-detailed-page.component';

describe('CustomDetailedPageComponent', () => {
  let component: CustomDetailedPageComponent;
  let fixture: ComponentFixture<CustomDetailedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDetailedPageComponent],
    });
    fixture = TestBed.createComponent(CustomDetailedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
