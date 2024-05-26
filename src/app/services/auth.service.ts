import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import { CredentialsService } from './credentials.service';
import { UserModel } from '../models/user';

const authUrl = `${environment.ip}/o/token/`;
const baseUrlv2 = `${environment.baseUrlv2}`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any = null;
  userSource = new BehaviorSubject<UserModel>(this.user);
  user$ = this.userSource.asObservable();
  authUser = {
    access_token: '',
    refresh_token: '',
  };

  private _http = inject(HttpClient);
  private _credentials = inject(CredentialsService);

  login(loginData): Observable<any> {
    const body = new FormData();
    body.append('grant_type', 'password');
    body.append('client_id', 'lBNcdmsTc5Om3N9MTP4Dy9Rnzc6eooPU4QVHVvS5');
    if (isNaN(loginData.username)) {
      body.append('username', loginData.username);
    } else {
      body.append('username', loginData.code + loginData.username);
    }
    body.append('password', loginData.password);
    return this._http.post(authUrl, body);
  }

  getToken() {
    return this._credentials.credentials?.access_token;
  }

  isLoggedIn() {
    return this._credentials.isAuthenticated();
  }

  canLogin() {
    return this.hasPermission('login_admin_usuario');
  }

  hasPermission(permission: string) {
    return (
      this.permissions.findIndex(
        (permiso) => permiso.codename === permission
      ) >= 0
    );
  }

  get permissions() {
    const credentials = this._credentials.credentials;
    let groups = credentials?.user.groups;
    if (groups) {
      return groups
        .filter((group) => group.name !== 'Usuario común')
        .reduce(
          (accumulator, currentValue) =>
            accumulator.concat(currentValue.permissions),
          []
        );
    }
    return null;
  }

  setUserData(user) {
    const modelo: any = '8A@bIUzA9Yukz!0G';
    const test = CryptoJS.enc.Utf8.parse(modelo);
    const corona = CryptoJS.AES.decrypt(user, test, {
      mode: CryptoJS.mode.ECB,
    });
    const userDecrypt = JSON.parse(corona.toString(CryptoJS.enc.Utf8));
    this.userSource.next(userDecrypt);
  }

  logout() {
    localStorage.removeItem('credentials');
  }

  getUserData() {
    return this._http.get(`${baseUrlv2}/usuario/me2/`);
  }
}
