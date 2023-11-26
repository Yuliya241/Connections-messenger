import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { map } from 'rxjs';
import { VideoItem } from 'src/app/youtube/models/search-item.model';

import { changeFavorite } from '../../../redux/actions/videos.actions';
import { selectFavoriteList } from '../../../redux/selectors/videos.selector';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})

export class SearchItemComponent implements OnInit {
  @Input() item?: VideoItem | undefined;

  id = '';

  color = 'red';

  isFavorite = false;

  constructor(private route: ActivatedRoute, private readonly store: Store) { }

  public isFavorite$ = this.store.select(selectFavoriteList)
    .pipe(map((value) => {
      const card = value.find((elem) => elem.id === this.item?.id);
      return !!card;
    }));

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  public addToFavorite(card: VideoItem) {
    this.store.dispatch(changeFavorite({ id: card.id, favoriteList: card }));
    this.isFavorite = !this.isFavorite;
  }
}
