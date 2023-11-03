import { Component } from '@angular/core';

import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  constructor(readonly youtubeService: YoutubeService) { }

  get filterShow() {
    return this.youtubeService.isFilterShow;
  }

  printText(text: string) {
    this.youtubeService.print(text);
  }

  orderByView() {
    this.youtubeService.sortByViews();
  }

  orderByDate() {
    this.youtubeService.sortByDate();
  }
}
