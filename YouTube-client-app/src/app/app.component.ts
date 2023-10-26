import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'YouTube-client-app';

  isSearchResults = false;

  showSearchResults() {
    this.isSearchResults = true;
  }

  isFilteringCriteriaBlock = false;

  showFilterButtons() {
    this.isFilteringCriteriaBlock = !this.isFilteringCriteriaBlock;
  }
}
