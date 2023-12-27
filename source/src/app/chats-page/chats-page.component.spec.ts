import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsPageComponent } from './chats-page.component';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { ChatsHeaderComponent } from '../chats-header/chats-header.component';

describe('ChatsPageComponent', () => {
  let component: ChatsPageComponent;
  let fixture: ComponentFixture<ChatsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatsPageComponent, ChatsListComponent, ChatsHeaderComponent],
    });
    fixture = TestBed.createComponent(ChatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
