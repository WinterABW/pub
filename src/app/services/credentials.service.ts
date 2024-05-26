import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const credentialsKey = 'credentials';

export interface Credentials {
  user?: any;
  access_token: string;
  refresh_token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: Credentials | null = null;

  get credentials(): Credentials | null {
    if (this._credentials) {
      if(this._credentials.user){
      let credentials = Object.assign({}, this._credentials)
      const modelo: any = '8A@bIUzA9Yukz!0G'
      const test = CryptoJS.enc.Utf8.parse(modelo)
      const corona = CryptoJS.AES.decrypt(credentials.user, test, { mode: CryptoJS.mode.ECB })
      const user = JSON.parse(corona.toString(CryptoJS.enc.Utf8))
      credentials.user = user
      return credentials;
      }
      return this._credentials
    }
    return null
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;
    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(credentialsKey);
    }
  }

}