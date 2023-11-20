import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { createCustomCard } from 'src/app/redux/actions/videos.actions';

import { dateValidator } from '../../date-validator';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  isSubmitted = false;

  count = 1;

  urlImageregex = /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/;

  urlYoutuberegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/;

  formAdmin = this.fb.group({
    title: ['Angular', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }],
    description: ['-', { nonNullable: true, validators: Validators.maxLength(255) }],
    img: ['https://i.ytimg.com/vi/YN8zNnV0sK8/hqdefault.jpg', { nonNullable: true, validators: [Validators.required, Validators.pattern(this.urlImageregex)] }],
    video: ['https://www.youtube.com/watch?v=iWX7qCGVt9U', { nonNullable: true, validators: [Validators.required, Validators.pattern(this.urlYoutuberegex)] }],
    date: ['2023-11-01', { nonNullable: true, validators: [Validators.required, dateValidator()] }],
    tags: this.fb.array([this.createTagsFormGroup()]),
  });

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private router: Router,
  ) { }

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
    return this.formAdmin.controls.img;
  }

  get creationDate() {
    return this.formAdmin.controls.date;
  }

  get linkToVideo() {
    return this.formAdmin.controls.video;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    const newCustomCard = {
      id: `${Date.now()}`,
      title: this.formAdmin.value.title || '',
      description: this.formAdmin.value.description || '',
      img: this.formAdmin.value.img || '',
      video: this.formAdmin.value.video || '',
      date: this.formAdmin.value.date || '',
    };

    this.store.dispatch(createCustomCard({ newCard: newCustomCard }));
    this.router.navigate(['main']);
  }
}
