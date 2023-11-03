import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CardBorderDirective } from './directive/card-border.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { OrderByViewsPipe } from './pipes/order-by-views.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    OrderByDatePipe,
    OrderByViewsPipe,
    CustomButtonComponent,
    CardBorderDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
  ],
  exports: [
    FilterPipe,
    OrderByDatePipe,
    OrderByViewsPipe,
    CustomButtonComponent,
    CardBorderDirective,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
  ],
})
export class SharedModule { }
