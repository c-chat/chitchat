import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninSectionComponent } from './signin-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SigninSectionComponent', () => {
  let component: SigninSectionComponent;
  let fixture: ComponentFixture<SigninSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninSectionComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(SigninSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.signinForm.get('username')?.value).toEqual('');
    expect(component.signinForm.get('password')?.value).toEqual('');
  })

  it('should show username error if whitespace is present', () => {
    const usernameField = component.signinForm.get('username');
    usernameField?.setValue('user name');
    usernameField?.markAsTouched();
    component.onUsernameFieldBlur();
    expect(component.showUsernameError).toBeTruthy();
  });

  it('should call onSubmit method when form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('ngSubmit'));
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should show password error when criteria are not met', () => {
    const passwordControl = component.signinForm.get('password');
  
    passwordControl?.setValue('weakpassword');
  
    component.onPasswordFieldBlur();
  
    expect(component.showPasswordError).toBeTruthy();
  });

  it('should show error for empty username or password', () => {
    const usernameControl = component.signinForm.get('username');
    const passwordControl = component.signinForm.get('password');
  
    usernameControl?.setValue('');
    passwordControl?.setValue('');
  
    component.onUsernameFieldBlur();
    component.onPasswordFieldBlur();
  
    expect(usernameControl?.hasError('required')).toBe(true);
    expect(passwordControl?.hasError('required')).toBe(true);
  });
  
  
});