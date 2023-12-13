import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupSectionComponent } from './signup-section.component';

describe('SignupSectionComponent', () => {
  let component: SignupSectionComponent;
  let fixture: ComponentFixture<SignupSectionComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupSectionComponent],
      providers: [FormBuilder],
      imports: [HttpClientModule, HttpClientTestingModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(SignupSectionComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require username, password, and confirm password', () => {
    const usernameControl = component.signupForm.get('username');
    const passwordControl = component.signupForm.get('password');
    const confirmPasswordControl = component.signupForm.get('confirmPassword');
  
    expect(usernameControl).toBeDefined();
    expect(passwordControl).toBeDefined();
    expect(confirmPasswordControl).toBeDefined();
  
    component.onSubmit('', ''); 

    expect(usernameControl?.hasError('required')).toBeTruthy();
    expect(passwordControl?.hasError('required')).toBeTruthy();
    expect(confirmPasswordControl?.hasError('required')).toBeTruthy();
  });
  
});
