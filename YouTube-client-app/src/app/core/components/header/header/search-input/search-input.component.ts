import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Output() showResults = new EventEmitter();

  searchResults() {
    this.showResults.emit();
  }
}
