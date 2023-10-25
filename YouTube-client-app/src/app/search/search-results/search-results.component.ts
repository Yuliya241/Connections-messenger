import { Component } from '@angular/core';
import { Item } from 'src/app/models/search-item.model';
import response from '../../data/response.json';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  items: Item[] = response.items;
}
