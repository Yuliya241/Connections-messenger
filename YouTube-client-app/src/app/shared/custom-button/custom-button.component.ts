import { Component, Input } from '@angular/core';

import { Item } from 'src/app/youtube/models/search-item.model';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Input() item: Item | undefined;
}
