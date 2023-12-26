import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsPageComponent } from './chats-page.component';

describe('ChatsPageComponent', () => {
  let component: ChatsPageComponent;
  let fixture: ComponentFixture<ChatsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatsPageComponent]
    });
    fixture = TestBed.createComponent(ChatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
