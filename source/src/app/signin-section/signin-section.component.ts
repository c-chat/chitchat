import { Component } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, Validators, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-signin-section',
  templateUrl: './signin-section.component.html',
  styleUrls: ['./signin-section.component.scss']
})
export class SigninSectionComponent {
  constructor (private fb: FormBuilder){}
  signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit() {
    console.log(this.signinForm)
  }

}
