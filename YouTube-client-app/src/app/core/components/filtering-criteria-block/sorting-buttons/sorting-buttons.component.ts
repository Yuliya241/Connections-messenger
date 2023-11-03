import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sorting-buttons',
  templateUrl: './sorting-buttons.component.html',
  styleUrls: ['./sorting-buttons.component.scss'],
})
export class SortingButtonsComponent {
  @Output() sortView = new EventEmitter();

  @Output() sortDate = new EventEmitter();

  orderByViews() {
    this.sortView.emit();
  }

  orderByDate() {
    this.sortDate.emit();
  }
}
