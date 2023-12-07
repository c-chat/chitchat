import { Component } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-signup-section',
  templateUrl: './signup-section.component.html',
  styleUrls: ['./signup-section.component.scss']
})
export class SignupSectionComponent {
  constructor (private fb: FormBuilder){}
  signupForm = this.fb.group({
    username: ['', [Validators.required, this.patternValidator(/^\S*$/, { noWhitespace: true })]],
    password: ['', [Validators.required, Validators.minLength(8), this.patternValidator(/\d/, { hasNumber: true }), this.patternValidator(/[A-Z]/, { hasCapitalCase: true }), this.patternValidator(/[a-z]/, { hasSmallCase: true }), this.patternValidator(/[.]+/, { hasSpecialCharacters: true }), this.patternValidator(/^\S*$/, { noWhitespace: true })]],
    confirmPassword: ['', Validators.required]
  })

  patternValidator(regex: RegExp, error: ValidationErrors | null): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // check for whitespace
      const hasWhitespace = /\s/.test(control.value);
      if (valid && !hasWhitespace) {
        return null;
      }
      else {
        return error;
      }
    };
  }

  onSubmit() {
    console.log(this.signupForm)
  }

}
