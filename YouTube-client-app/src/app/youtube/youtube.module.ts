import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    DetailedPageComponent,
    SearchItemComponent,
    SearchResultsComponent,
  ],
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    SharedModule,
  ],
})
export class YoutubeModule { }
