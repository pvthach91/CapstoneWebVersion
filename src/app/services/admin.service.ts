import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {configuration} from "../model/configuration.model";
import {SignUpInfo} from "../auth/signup-info";
import {UserSearchCriteria} from "../model/user-search-criteria.model";
import {Page} from "../model/page.model";
import {ApiResponse} from "../model/api-response.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getUsers(criteria: UserSearchCriteria): Observable<Page> {
    const url = configuration.host + '/api/users';
    return this.http.post<Page>(url, criteria , httpOptions);
  }

  getCurrentUser(): Observable<User> {
    const url = configuration.host + '/api/currentUser';
    return this.http.get<User>(url , httpOptions);
  }

  getUser(id: number): Observable<User> {
    const url = configuration.host + '/api/user/' + id;
    return this.http.get<User>(url , httpOptions);
  }

  registerPM(info: SignUpInfo): Observable<ApiResponse> {
    const url = configuration.host + '/api/user/createOperation';
    return this.http.post<ApiResponse>(url, info, httpOptions);
  }


  deactivateUser(username: string): Observable<ApiResponse> {
    const url = configuration.host + '/api/user/deactivate/' + username;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  activateUser(username: string): Observable<ApiResponse> {
    const url = configuration.host + '/api/user/activate/' + username;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }
}
