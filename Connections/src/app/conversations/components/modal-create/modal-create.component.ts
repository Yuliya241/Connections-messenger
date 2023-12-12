import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { selectLoaded, selectLoading } from 'src/app/store/auth-store/selectors';
import { createGroup } from 'src/app/store/chat-store/chat.actions';

@Component({
  selector: 'app-modal-create-group',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss'],
})
export class ModalCreateComponent {
  isSubmitted = false;

  regex = /^[A-Za-z0-9\s]*$/;

  formCreateGroup = this.fb.group({
    name: ['', {
      nonNullable: true,
      validators: [
        Validators.required, Validators.maxLength(30), Validators.pattern(this.regex)],
    }],
  });

  loading$: Observable<boolean> = this.store.select(selectLoading);

  loaded$: Observable<boolean> = this.store.select(selectLoaded);

  constructor(private fb: FormBuilder, private store: Store) { }

  get name() {
    return this.formCreateGroup.controls.name;
  }

  public create() {
    this.store.dispatch(createGroup({ name: this.formCreateGroup.value.name || '' }));
  }
}
