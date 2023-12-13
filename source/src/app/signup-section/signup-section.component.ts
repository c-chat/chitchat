import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { EncryptionService } from '../encryption.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-signup-section',
  templateUrl: './signup-section.component.html',
  styleUrls: ['./signup-section.component.scss']
})
export class SignupSectionComponent {
  signupForm: FormGroup;
  passwordBlurred: boolean = false;
  usernameBlurred: boolean = false;

  constructor(private fb: FormBuilder, private encryptionService: EncryptionService, private http: HttpClient) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, this.patternValidator(/^\S*$/, { noWhitespace: true })]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.patternValidator(/\d/, { hasNumber: true }),
          this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          this.patternValidator(/[a-z]/, { hasSmallCase: true }),
          this.patternValidator(/[.]+/, { hasSpecialCharacters: true }),
          this.patternValidator(/^\S*$/, { noWhitespace: true })
        ]
      ],
      confirmPassword: ['', Validators.required]
    });
  }

  validateUsername() {
    this.usernameBlurred = true;
    const usernameControl = this.signupForm.get('username');
    if (usernameControl) {
      usernameControl.markAsTouched();
      usernameControl.updateValueAndValidity();
    }
  }
  

  patternValidator(regex: RegExp, error: any) {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);
      const hasWhitespace = /\s/.test(control.value);

      if (valid && !hasWhitespace) {
        return null;
      } else {
        return error;
      }
    };
  }

  getPasswordErrors(): string {
    const passwordControl = this.signupForm.get('password');
    const errors = passwordControl?.errors;
    let errorMessage = 'Password is required and must have at least 8 characters, one capital letter, one small letter, one number, and one "."';
  
    if (errors) {
      if (errors['required'] || errors['minlength'] || errors['noWhitespace'] || errors['hasNumber'] ||
          errors['hasCapitalCase'] || errors['hasSmallCase'] || errors['hasSpecialCharacters']) {
        return errorMessage;
      }
    }
    
    return '';
  }
  

  validatePassword() {
    const passwordControl = this.signupForm.get('password');
    if (passwordControl && this.passwordBlurred) {
      passwordControl.markAsTouched();
      passwordControl.updateValueAndValidity();
    }
  }

  checkPasswordsMatch() {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    const passwordsMatch = password === confirmPassword;
  
    if (!passwordsMatch) {
      const confirmPassControl = this.signupForm.get('confirmPassword');
      if (confirmPassControl) {
        confirmPassControl.setErrors({ 'passwordMismatch': true });
      }
    } else {
      const confirmPassControl = this.signupForm.get('confirmPassword');
      if (confirmPassControl && confirmPassControl.errors?.['passwordMismatch']) {
        confirmPassControl.setErrors(null);
      }
    }
  
    return passwordsMatch;
  }
  
  onSubmit(username: string, password: string) {
    console.log(this.signupForm);
    const encryptedCredentials = this.encryptionService.encryptCredentials(username, password);

    this.http.post(`${environment.apiUrl}/login`, { credentials: encryptedCredentials }).subscribe(
      (response) => {
        
      },
      (error) => {
      
      }
    );
  }
}