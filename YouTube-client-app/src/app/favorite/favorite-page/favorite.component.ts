import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectFavoriteList } from '../../redux/selectors/videos.selector';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  constructor(
    private readonly store: Store,
  ) { }

  public videos$ = this.store.select(selectFavoriteList);
}
