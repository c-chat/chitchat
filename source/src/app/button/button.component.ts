import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment.development';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  response: any;
  status!: number;

  constructor(private http: HttpClient) {}

  makeRequest() {
    this.http.get(environment.apiUrl + '/usertest').subscribe(
      (data: any) => {
        this.response = data; 
      },
      (error) => {
        console.error('Request failed:', error);
      },
      () => {
        this.status = this.response?.status;
      }
    );
  }

}
