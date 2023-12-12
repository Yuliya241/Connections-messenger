import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListItemsComponent } from './group-list-items.component';

describe('GroupListItemsComponent', () => {
  let component: GroupListItemsComponent;
  let fixture: ComponentFixture<GroupListItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupListItemsComponent],
    });
    fixture = TestBed.createComponent(GroupListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
