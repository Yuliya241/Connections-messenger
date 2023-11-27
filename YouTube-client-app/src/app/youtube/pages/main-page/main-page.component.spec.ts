import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { changePageNumber, fetchVideosNext } from '../../../redux/actions/videos.actions';
import { initialState } from '../../../redux/state.models';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      providers: [provideMockStore({ initialState })],
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions by onNextPage click', () => {
    let pageNumber = 1;
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const action = fetchVideosNext();
    const action2 = changePageNumber({ pageNumber: pageNumber += 1 });
    component.onNextPage();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(dispatchSpy).toHaveBeenCalledWith(action2);
  });

  it('should dispatch actions by onPreviousPage click', () => {
    let pageNumber = 1;
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const action = fetchVideosNext();
    const action2 = changePageNumber({ pageNumber: pageNumber -= 1 });
    component.onPreviousPage();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(dispatchSpy).toHaveBeenCalledWith(action2);
  });
});
