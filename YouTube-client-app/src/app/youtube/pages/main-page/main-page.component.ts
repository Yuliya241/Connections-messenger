import { Component } from '@angular/core';

import { Item } from 'src/app/youtube/models/search-item.model';

import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  data: Item[] = this.youtubeService.getData();

  constructor(private readonly youtubeService: YoutubeService) { }

  get showResults() {
    return this.youtubeService.isShowResults;
  }

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
