import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import {ApiResponse} from "../model/api-response.model";
import {configuration} from "../model/configuration.model";
import {ChangePassword} from "./change-password";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private configuration = configuration;

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<ApiResponse> {
    const url = configuration.host + '/api/auth/signin';
    return this.http.post<ApiResponse>(url, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<ApiResponse> {
    const url = configuration.host + '/api/auth/signup';
    return this.http.post<ApiResponse>(url, info, httpOptions);
  }

  changePassword(cp: ChangePassword): Observable<ApiResponse> {
    const url = configuration.host + '/changePassword';
    return this.http.post<ApiResponse>(url, cp, httpOptions);
  }
}
