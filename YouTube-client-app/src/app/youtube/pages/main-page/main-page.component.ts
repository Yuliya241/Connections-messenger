import { Component, OnInit } from '@angular/core';

import { debounceTime, filter, map, switchMap } from 'rxjs';

import { VideoItem, VideoResponse } from '../../models/search-item.model';
import { SearchVideosService } from '../../services/search-videos.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private youtubeService: YoutubeService,
    private searchVideosService: SearchVideosService,
  ) { }

  videos: VideoItem[] = [];

  ngOnInit(): void {
    this.searchVideosService.searchTerm$
      .pipe(
        filter((value: string) => value.length > 2),
        debounceTime(300),
        switchMap((searchTerm: string) => this.searchVideosService.searchVideo(searchTerm)),
        map((item: VideoResponse) => item.items),
      ).subscribe((res) => { this.videos = res; });
    this.searchVideosService.video$.subscribe((res) => { this.videos = res; });
  }

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
