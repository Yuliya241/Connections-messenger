import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectProfile } from 'src/app/store/auth-store/selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private store = inject(Store);

  userInfo$ = this.store.select(selectProfile);
}
