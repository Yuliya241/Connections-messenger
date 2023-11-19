import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { combineLatest, map } from 'rxjs';
import { selectCards, selectVideos } from 'src/app/redux/selectors/videos.selector';

import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  private videos$ = this.store.select(selectVideos);

  private cards$ = this.store.select(selectCards);

  public searchResults$ = combineLatest([this.videos$, this.cards$]).pipe(map(([videos, cards]) => {
    return {
      videos: cards.length ? videos.slice(0, videos.length - cards.length) : videos,
      cards,
    };
  }));

  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly store: Store,
  ) { }

  get viewsOrder() {
    return this.youtubeService.viewsOrder;
  }

  get dateOrder() {
    return this.youtubeService.dateOrder;
  }

  get text() {
    return this.youtubeService.searchTerm;
  }
}
