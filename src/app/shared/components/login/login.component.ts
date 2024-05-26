import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../material-module';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {
  Credentials,
  CredentialsService,
} from '../../../services/credentials.service';
import { UserModel } from '../../../models/user';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MaterialModule, ReactiveFormsModule],
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  user: UserModel;
  
  fb = inject(UntypedFormBuilder);
  private _authService = inject(AuthService);
  private _credential = inject(CredentialsService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      code: ['+53', []],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe((response) => {
        const { access_token, refresh_token } = response;
        this._credential.setCredentials({ access_token, refresh_token });
        this._authService
          .getUserData()
          .pipe(
            catchError((err) => {
              this._credential.setCredentials({
                user: null,
                access_token: '',
                refresh_token: '',
              });
              return throwError(err);
            })
          )
          .subscribe((user: any) => {
            this.user = user;
            const credentialsUser: Credentials = {
              access_token,
              refresh_token,
              user,
            };
            this._credential.setCredentials(credentialsUser);
            if (this._authService.canLogin()) {
              this._authService.setUserData(this.user);
              alert('ok');
            } else {
              this._authService.logout();
              alert('no');
            }
          });
      });
    }
  }
}
