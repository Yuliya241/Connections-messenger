import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/youtube/models/search-item.model';

import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})

export class SearchItemComponent implements OnInit {
  @Input() item!: Item;

  id: string | null = null;

  constructor(readonly youtubeService: YoutubeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
