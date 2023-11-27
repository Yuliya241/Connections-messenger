import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { YoutubeService } from '../../../../youtube/services/youtube.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let youtubeService: YoutubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideMockStore({})],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    youtubeService = TestBed.inject(YoutubeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button Favourite', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toEqual('Favourite');
  });

  it('should call showFilterButtons', () => {
    const mySpy = jest.spyOn(youtubeService, 'showFilterBlock');
    component.showFilterButtons();
    expect(mySpy).toHaveBeenCalledTimes(1);
  });
});
