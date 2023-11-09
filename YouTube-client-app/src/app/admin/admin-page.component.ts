import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    linkVideo: ['', Validators.required],
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

  get linkVideo() {
    return this.formAdmin.controls.linkVideo;
  }

  onSubmit(): void {
    this.isSubmitted = true;
  }
}
