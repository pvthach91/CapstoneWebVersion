import { Injectable } from '@angular/core';
import {configuration} from "../model/configuration.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {State} from "../model/state.model";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getStates(): Observable<State[]> {
    const url = configuration.host + '/api/guest/states';
    return this.http.get<State[]>(url);
  }
}
