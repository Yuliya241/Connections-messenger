import { Component, Input, OnInit } from '@angular/core';

import { Item } from '../../models/search-item.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss'],
})
export class DetailedPageComponent implements OnInit {
  @Input() id?: string;

  item?: Item;

  constructor(readonly youtubeService: YoutubeService) { }

  ngOnInit() {
    if (!this.id) return;
    this.item = this.youtubeService.getItemById(this.id);
  }
}