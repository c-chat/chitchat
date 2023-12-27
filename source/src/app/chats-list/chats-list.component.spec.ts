import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsListComponent } from './chats-list.component';
import { ChatsHeaderComponent } from '../chats-header/chats-header.component';

describe('ChatsListComponent', () => {
  let component: ChatsListComponent;
  let fixture: ComponentFixture<ChatsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatsListComponent, ChatsHeaderComponent],
    });
    fixture = TestBed.createComponent(ChatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
