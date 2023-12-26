import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitchatNameComponent } from './chitchat-name.component';

describe('ChitchatNameComponent', () => {
  let component: ChitchatNameComponent;
  let fixture: ComponentFixture<ChitchatNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChitchatNameComponent]
    });
    fixture = TestBed.createComponent(ChitchatNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
