import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeService } from '../../../../youtube/services/youtube.service';
import { FilterBlockComponent } from './filter-block.component';

describe('FilterBlockComponent', () => {
  let component: FilterBlockComponent;
  let fixture: ComponentFixture<FilterBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterBlockComponent],
    });
    fixture = TestBed.createComponent(FilterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort by views', () => {
    const youtubeService = fixture.debugElement.injector.get(YoutubeService);
    const mySpy = jest.spyOn(youtubeService, 'sortByViews');
    component.orderByView();
    expect(mySpy).toHaveBeenCalledTimes(1);
  });

  it('should sort by date', () => {
    const youtubeService = fixture.debugElement.injector.get(YoutubeService);
    const mySpy = jest.spyOn(youtubeService, 'sortByDate');
    component.orderByDate();
    expect(mySpy).toHaveBeenCalledTimes(1);
  });
});
