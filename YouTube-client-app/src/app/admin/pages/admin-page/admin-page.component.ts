import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { dateValidator } from '../../date-validator';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  isSubmitted = false;

  count = 1;

  formAdmin = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', Validators.maxLength(255)],
    image: ['', Validators.required],
    linkToVideo: ['', Validators.required],
    creationDate: ['', [Validators.required, dateValidator()]],
    tags: this.fb.array([this.createTagsFormGroup()]),
  });

  constructor(private fb: FormBuilder) { }

  createTagsFormGroup(): FormGroup {
    return this.fb.group({
      tag: ['', Validators.required],
    });
  }

  get tagsControls() {
    return (this.formAdmin.get('tags') as FormArray).controls;
  }

  addTags() {
    this.count += 1;
    if (this.count <= 5) {
      const tags = this.formAdmin.get('tags');
      if (tags instanceof FormArray) {
        tags.push(this.createTagsFormGroup());
      }
    }
  }

  removeTags() {
    const tags = this.formAdmin.get('tags');
    if (tags instanceof FormArray) {
      while (tags.length !== 1) {
        tags.removeAt(0);
        this.count = 1;
      }
    }
  }

  resetAll() {
    this.formAdmin.reset();
    this.removeTags();
    this.isSubmitted = false;
  }

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
