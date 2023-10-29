import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CardBorderDirective } from './directive/card-border.directive';
import { FilterInputComponent } from './filtering-criteria-block/filter-input/filter-input.component';
import { SortingButtonsComponent } from './filtering-criteria-block/sorting-buttons/sorting-buttons.component';
import { HeaderComponent } from './header/header/header.component';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { OrderByViewsPipe } from './pipes/order-by-views.pipe';
import { SearchItemComponent } from './search/search-item/search-item.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchItemComponent,
    SearchResultsComponent,
    SortingButtonsComponent,
    FilterInputComponent,
    CardBorderDirective,
    FilterPipe,
    OrderByDatePipe,
    OrderByViewsPipe,
    CustomButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HeaderComponent,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
