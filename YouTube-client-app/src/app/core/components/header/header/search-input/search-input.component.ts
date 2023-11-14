import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatButtonModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Output() changeText = new EventEmitter<string>();

  video = '';

  search() {
    this.changeText.emit(this.video);
  }
}
