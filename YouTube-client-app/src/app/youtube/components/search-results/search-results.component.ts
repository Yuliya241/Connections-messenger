import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { CustomCard } from 'src/app/redux/state.models';
import { VideoItem } from 'src/app/youtube/models/search-item.model';

import { selectCards } from '../../../redux/selectors/videos.selector';

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
