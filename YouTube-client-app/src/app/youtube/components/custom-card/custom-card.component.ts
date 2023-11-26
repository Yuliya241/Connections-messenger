import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { deleteCustomCard } from '../../../redux/actions/videos.actions';
import { CustomCard } from '../../../redux/state.models';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
})
export class CustomCardComponent {
  @Input() card: CustomCard | undefined;

  constructor(private readonly store: Store) { }

  public deleteCard(card: CustomCard) {
    this.store.dispatch(deleteCustomCard({ id: card.id }));
  }
}
