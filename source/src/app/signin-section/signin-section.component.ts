import { Component, OnInit } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EncryptionService } from '../encryption.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-signin-section',
  templateUrl: './signin-section.component.html',
  styleUrls: ['./signin-section.component.scss']
})
export class SigninSectionComponent implements OnInit {
  signinForm!: FormGroup;
  showPasswordError = false;
  showUsernameError = false;
  submitted = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.passwordValidator])
    })
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasSmallLetter = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasDot = /\./.test(value);

    if (
      value.length < 8 ||
      !hasCapitalLetter ||
      !hasSmallLetter ||
      !hasNumber ||
      !hasDot
    ) {
      return {
        passwordCriteria: true
      };
    }

    return null;
  }

  onPasswordFieldFocus() {
    this.showPasswordError = false;
  }

  onPasswordFieldBlur() {
    this.showPasswordError = true;
  }

  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    
    if (/\s/.test(value)) {
      return { 'noWhitespace': true };
    }

    return null;
  }

  onUsernameFieldFocus() {
    this.showUsernameError = false;
  }

  onUsernameFieldBlur() {
    this.showUsernameError = true;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.signinForm.value);
    if (this.signinForm.valid) {
        const { username, password } = this.signinForm.value;
        const encryptedCredentials = this.encryptionService.encryptCredentials(username, password);
        this.http.post(environment.apiUrl + '/signin', { credentials: encryptedCredentials }).subscribe(
            data => {
                console.log(data);
                this.signinForm.reset();
            },
            error => {
                console.log(error);
                this.signinForm.setErrors({ 'invalidCredentials': true });
            }
        );
    }
}

}


