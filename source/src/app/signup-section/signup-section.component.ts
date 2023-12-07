import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-section',
  templateUrl: './signup-section.component.html',
  styleUrls: ['./signup-section.component.scss']
})
export class SignupSectionComponent {
  signupForm: FormGroup;
  passwordBlurred: boolean = false;

  constructor(private fb: FormBuilder) {
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
    let errorMessage = '';

    if (errors) {
      if (errors['required']) {
        errorMessage += 'Password is required. ';
      }
      if (errors['minlength']) {
        errorMessage += 'Password must be at least 8 characters long. ';
      }
      if (errors['hasNumber']) {
        errorMessage += 'Password must contain at least one number. ';
      }
      if (errors['hasCapitalCase']) {
        errorMessage += 'Password must contain at least one capital letter. ';
      }
      if (errors['hasSmallCase']) {
        errorMessage += 'Password must contain at least one small letter. ';
      }
      if (errors['hasSpecialCharacters']) {
        errorMessage += 'Password must contain a "." in it. ';
      }
      if (errors['noWhitespace']) {
        errorMessage += 'Password cannot contain whitespace. ';
      }
    }

    return errorMessage.trim();
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
  
  onSubmit() {
    console.log(this.signupForm);
  }
}
