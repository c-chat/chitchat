import { Component } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors, Validators, FormControl, FormArray } from '@angular/forms';
import { EncryptionService } from '../encryption.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-signin-section',
  templateUrl: './signin-section.component.html',
  styleUrls: ['./signin-section.component.scss']
})
export class SigninSectionComponent {
  constructor (private fb: FormBuilder, private encryptionService: EncryptionService, private http: HttpClient){}
  signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit(username: string, password: string) {
    console.log(this.signinForm);
    const encryptedCredentials = this.encryptionService.encryptCredentials(username, password);

    this.http.post(`${environment.apiUrl}/login`, { credentials: encryptedCredentials }).subscribe(
      (response) => {
        
      },
      (error) => {
      
      }
    );
  }

}
