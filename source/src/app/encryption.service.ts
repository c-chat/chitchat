import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encryptCredentials(username: string, password: string): string {
    const encryptedUsername = CryptoJS.AES.encrypt(username, environment.encryptionKey).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, environment.encryptionKey).toString();

    return JSON.stringify({ encryptedUsername, encryptedPassword });
  }
}
