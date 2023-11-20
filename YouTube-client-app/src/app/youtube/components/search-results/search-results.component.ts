import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectCards } from 'src/app/redux/selectors/videos.selector';
import { CustomCard } from 'src/app/redux/state.models';
import { VideoItem } from 'src/app/youtube/models/search-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() items: VideoItem[] = [];

  @Input() cards: CustomCard[] = [];

  constructor(private readonly store: Store) { }

  public cards$ = this.store.select(selectCards);
}
