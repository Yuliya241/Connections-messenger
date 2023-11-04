import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { FilterBlockComponent } from './components/filtering-criteria-block/filter-block/filter-block.component';
import { FilterInputComponent } from './components/filtering-criteria-block/filter-input/filter-input.component';
import { SortingButtonsComponent } from './components/filtering-criteria-block/sorting-buttons/sorting-buttons.component';
import { HeaderComponent } from './components/header/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    FilterBlockComponent,
    FilterInputComponent,
    SortingButtonsComponent,
  ],
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule,
    MatButtonModule,
  ],
  exports: [
    HeaderComponent,
    FilterBlockComponent,
  ],
})
export class CoreModule { }
