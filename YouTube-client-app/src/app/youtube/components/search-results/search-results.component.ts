import { Component, Input } from '@angular/core';

import { VideoItem } from 'src/app/youtube/models/search-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() items: VideoItem[] = [];
}
