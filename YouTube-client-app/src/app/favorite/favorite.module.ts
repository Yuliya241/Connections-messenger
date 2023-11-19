import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FavoriteListComponent } from './favorite-list/favorite-list/favorite-list.component';
import { FavoriteComponent } from './favorite-page/favorite.component';
import { FavoriteRoutingModule } from './favorite-routing.module';

@NgModule({
  declarations: [
    FavoriteComponent,
    FavoriteListComponent,
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
  ],
})
export class FavoriteModule { }
