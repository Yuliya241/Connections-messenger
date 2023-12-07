import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { updateUser } from 'src/app/store/auth-store/actions';
import { selectLoaded, selectLoading, selectProfile } from 'src/app/store/auth-store/selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loaded$: Observable<boolean> = this.store.select(selectLoaded);

  userInfo$ = this.store.select(selectProfile);

  loading$: Observable<boolean> = this.store.select(selectLoading);

  isSubmitted = false;

  isEditPressed = false;

  disabled = true;

  formProfile = this.fb.group({
    name: ['', { nonNullable: true, validators: Validators.required }],
    email: ['', { nonNullable: true }],
    id: ['', { nonNullable: true }],
  });

  constructor(private fb: FormBuilder, private destroyRef: DestroyRef, private store: Store) { }

  ngOnInit(): void {
    this.returnValues();
    this.formProfile.disable();
  }

  get name() {
    return this.formProfile.controls.name;
  }

  public returnValues(): void {
    this.store.select(selectProfile).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.formProfile.patchValue({
          name: value?.name.S || '',
          email: value?.email?.S || '',
          id: value?.uid?.S || '',
        });
      });
  }

  public edit(): void {
    this.name.enable();
    this.isEditPressed = true;
  }

  public cancel(): void {
    this.name.disable();
    this.isEditPressed = false;
    this.returnValues();
  }

  public save(): void {
    this.store.dispatch(updateUser({
      name: this.formProfile.value.name || '',
    }));

    this.name.disable();
    this.isEditPressed = false;
  }
}
