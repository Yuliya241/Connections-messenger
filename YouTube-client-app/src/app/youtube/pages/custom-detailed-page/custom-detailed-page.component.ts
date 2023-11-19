import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { tap } from 'rxjs';
import { setCustomCard } from 'src/app/redux/actions/videos.actions';
import { selectCard } from 'src/app/redux/selectors/videos.selector';

@Component({
  selector: 'app-custom-detailed-page',
  templateUrl: './custom-detailed-page.component.html',
  styleUrls: ['./custom-detailed-page.component.scss'],
})
export class CustomDetailedPageComponent implements OnInit {
  @Input() id = '';

  item = this.store.select(selectCard).pipe(
    tap((value) => {
      if (!value) {
        this.router.navigate(['not-found']);
      }
    }),
  );

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    if (!this.id) {
      this.router.navigate(['not-found']);
      return;
    }

    this.store.dispatch(setCustomCard({ id: this.id }));
  }

  public back(): void {
    this.router.navigateByUrl('/main');
  }
}
