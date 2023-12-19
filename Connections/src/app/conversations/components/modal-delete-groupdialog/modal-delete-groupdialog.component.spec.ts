import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteGroupdialogComponent } from './modal-delete-groupdialog.component';

describe('ModalDeleteGroupdialogComponent', () => {
  let component: ModalDeleteGroupdialogComponent;
  let fixture: ComponentFixture<ModalDeleteGroupdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeleteGroupdialogComponent],
    });
    fixture = TestBed.createComponent(ModalDeleteGroupdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
