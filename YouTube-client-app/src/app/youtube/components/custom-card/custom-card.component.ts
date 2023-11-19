import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { CustomCard } from 'src/app/redux/state.models';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
})
export class CustomCardComponent {
  @Input() card: CustomCard | undefined;

  id = '';

  constructor(private readonly store: Store) { }

  // public deleteCard(id: string) {
  //   this.store.dispatch(deleteCustomCard({ id }));
  //   this.store.select(selectCard);
  // }
}
