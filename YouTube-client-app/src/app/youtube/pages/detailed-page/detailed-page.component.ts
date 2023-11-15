import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { find, map, Observable, switchMap } from 'rxjs';

import { VideoItem, VideoResponse } from '../../models/search-item.model';
import { SearchVideosService } from '../../services/search-videos.service';

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss'],
})
export class DetailedPageComponent implements OnInit {
  @Input() id = '';

  @Input() keyword = '';

  item?: Observable<VideoItem | undefined>;

  constructor(
    private router: Router,
    private searchVideosService: SearchVideosService,
  ) { }

  ngOnInit(): void {
    this.item = this.searchVideosService.searchVideoById(this.id)
      .pipe(
        map((response: VideoResponse) => response),
        switchMap((response: VideoResponse) => response.items),
        find((item) => item.id === this.id),
      );
    if (!this
      .item) {
      this.router.navigate(['not-found']);
    }
  }

  public back(): void {
    this.router.navigateByUrl('/main');
  }
}
