import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { dateValidator } from '../../date-validator';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  isSubmitted = false;

  formAdmin = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', Validators.maxLength(255)],
    image: ['', Validators.required],
    linkToVideo: ['', Validators.required],
    creationDate: ['', [Validators.required, dateValidator()]],
  });

  constructor(private fb: FormBuilder) { }

  get title() {
    return this.formAdmin.controls.title;
  }

  get description() {
    return this.formAdmin.controls.description;
  }

  get image() {
    return this.formAdmin.controls.image;
  }

  get creationDate() {
    return this.formAdmin.controls.creationDate;
  }

  get linkToVideo() {
    return this.formAdmin.controls.linkToVideo;
  }

  onSubmit(): void {
    this.isSubmitted = true;
  }
}
