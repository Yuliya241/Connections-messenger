import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from '../../models/search-item.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss'],
})
export class DetailedPageComponent implements OnInit {
  @Input() id = '';

  item?: Item;

  constructor(private readonly youtubeService: YoutubeService, private router: Router) { }

  ngOnInit() {
    this.item = this.youtubeService.getItemById(this.id);
    if (!this.item) {
      this.router.navigate(['not-found']);
    }
  }

  back() {
    this.router.navigate(['main']);
  }
}
