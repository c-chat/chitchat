import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSectionComponent } from './signup-section.component';

describe('SignupSectionComponent', () => {
  let component: SignupSectionComponent;
  let fixture: ComponentFixture<SignupSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupSectionComponent]
    });
    fixture = TestBed.createComponent(SignupSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
