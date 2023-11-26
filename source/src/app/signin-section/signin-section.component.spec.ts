import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSectionComponent } from './signin-section.component';

describe('SigninSectionComponent', () => {
  let component: SigninSectionComponent;
  let fixture: ComponentFixture<SigninSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninSectionComponent]
    });
    fixture = TestBed.createComponent(SigninSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
