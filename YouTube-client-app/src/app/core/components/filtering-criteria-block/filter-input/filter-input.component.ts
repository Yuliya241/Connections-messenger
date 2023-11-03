import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
export class FilterInputComponent {
  @Output() changeText = new EventEmitter<string>();

  text = '';

  handleTextChange() {
    this.changeText.emit(this.text);
  }
}
