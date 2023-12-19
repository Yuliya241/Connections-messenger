import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteUserdialogComponent } from './modal-delete-userdialog.component';

describe('ModalDeleteUserdialogComponent', () => {
  let component: ModalDeleteUserdialogComponent;
  let fixture: ComponentFixture<ModalDeleteUserdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeleteUserdialogComponent],
    });
    fixture = TestBed.createComponent(ModalDeleteUserdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
