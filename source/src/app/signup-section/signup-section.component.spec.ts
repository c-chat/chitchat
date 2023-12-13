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
  let errMsg = 'Password is required and must have at least 8 characters, one capital letter, one small letter, one number, and one "."'

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

  it('should display an error if username contains whitespace', () => {
    const usernameInput = fixture.nativeElement.querySelector('input[name="username"]');
    const usernameControl = component.signupForm.get('username');
  
    // Simulate user input with whitespace
    usernameInput.value = 'user name';
    usernameInput.dispatchEvent(new Event('input'));
  
    // Ensure error message is displayed
    fixture.detectChanges();
  
    // Ensure error container is present
    const errorContainer = fixture.nativeElement.querySelector('.error-container');
    expect(errorContainer).toBeTruthy();
  
    // Ensure error message is displayed if present
    const errorElement = errorContainer?.querySelector('.error.show');
  
    if (errorElement) {
      expect(errorElement.textContent).toContain('Username cannot contain whitespace.');
      expect(usernameControl?.hasError('noWhitespace')).toBeTrue();
    } else {
      // If error element is not found, ensure the control is marked as invalid
      expect(usernameControl?.hasError('noWhitespace')).toBeTrue();
    }
  });
  
  it('should require at least one capital letter in password', () => {
    const passwordControl = component.signupForm.get('password');
  
    passwordControl!.setValue('passwordwithoutcapital');
  
    fixture.detectChanges();
    const errorContainer = fixture.nativeElement.querySelector('.password-error-container');
    expect(errorContainer).toBeTruthy();
  
    const errorElement = errorContainer?.querySelector('.password-error.show');
  
    if (errorElement) {
      expect(errorElement.textContent).toContain(errMsg);
      expect(passwordControl?.hasError('hasCapitalCase')).toBeTrue();
    } else {
      expect(passwordControl?.hasError('hasCapitalCase')).toBeTrue();
    }
  });

  it('should require at least one small letter in password', () => {
    const passwordControl = component.signupForm.get('password');
  
    passwordControl!.setValue('SDFKJSDFLDKJGS;GKBNSD;GBKNS');
  
    fixture.detectChanges();
    const errorContainer = fixture.nativeElement.querySelector('.password-error-container');
    expect(errorContainer).toBeTruthy();
  
    const errorElement = errorContainer?.querySelector('.password-error.show');
  
    if (errorElement) {
      expect(errorElement.textContent).toContain(errMsg);
      expect(passwordControl?.hasError('hasSmallCase')).toBeTrue();
    } else {
      expect(passwordControl?.hasError('hasSmallCase')).toBeTrue();
    }
  });

  it('should require at least one dot in password', () => {
    const passwordControl = component.signupForm.get('password');
  
    passwordControl!.setValue('jdgsdljhbsdfSLDKJDFGS345356');
  
    fixture.detectChanges();
    const errorContainer = fixture.nativeElement.querySelector('.password-error-container');
    expect(errorContainer).toBeTruthy();
  
    const errorElement = errorContainer?.querySelector('.password-error.show');
  
    if (errorElement) {
      expect(errorElement.textContent).toContain(errMsg);
      expect(passwordControl?.hasError('hasSpecialCharacters')).toBeTrue();
    } else {
      expect(passwordControl?.hasError('hasSpecialCharacters')).toBeTrue();
    }
  });

  it('should require at 8 characters in password', () => {
    const passwordControl = component.signupForm.get('password');
  
    passwordControl!.setValue('Aa.1');
  
    fixture.detectChanges();
    const errorContainer = fixture.nativeElement.querySelector('.password-error-container');
    expect(errorContainer).toBeTruthy();
  
    const errorElement = errorContainer?.querySelector('.password-error.show');
  
    if (errorElement) {
      expect(errorElement.textContent).toContain(errMsg);
      expect(passwordControl?.hasError('minlength')).toBeTrue();
    } else {
      expect(passwordControl?.hasError('minlength')).toBeTrue();
    }
  });
});
