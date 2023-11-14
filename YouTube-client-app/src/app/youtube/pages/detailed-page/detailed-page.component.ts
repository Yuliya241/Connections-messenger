import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { VideoItem } from '../../models/search-item.model';
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
    this.item = this.searchVideosService.searchVideoById(this.id);
    if (!this
      .item) {
      this.router.navigate(['not-found']);
    }
  }

  public back(): void {
    this.router.navigateByUrl('/main');
  }
}
