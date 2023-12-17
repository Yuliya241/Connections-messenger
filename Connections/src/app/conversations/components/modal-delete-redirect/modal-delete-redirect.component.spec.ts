import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteRedirectComponent } from './modal-delete-redirect.component';

describe('ModalDeleteRedirectComponent', () => {
  let component: ModalDeleteRedirectComponent;
  let fixture: ComponentFixture<ModalDeleteRedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeleteRedirectComponent],
    });
    fixture = TestBed.createComponent(ModalDeleteRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
