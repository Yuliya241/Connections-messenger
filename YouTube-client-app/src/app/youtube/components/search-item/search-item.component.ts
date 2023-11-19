import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VideoItem } from 'src/app/youtube/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})

export class SearchItemComponent implements OnInit {
  @Input() item: VideoItem | undefined;

  id = '';

  constructor(private route: ActivatedRoute) { }

  isFavorite = false;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  color = 'black';

  public addToFavorite() {
    if (this.isFavorite) {
      this.color = 'black';
    } else {
      this.color = 'red';
    }
    this.isFavorite = !this.isFavorite;
  }
}
