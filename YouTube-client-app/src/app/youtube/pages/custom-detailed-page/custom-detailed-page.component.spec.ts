import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { CustomDetailedPageComponent } from './custom-detailed-page.component';

describe('CustomDetailedPageComponent', () => {
  let component: CustomDetailedPageComponent;
  let fixture: ComponentFixture<CustomDetailedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDetailedPageComponent],
      providers: [provideMockStore({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    fixture = TestBed.createComponent(CustomDetailedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
