import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {configuration} from "../model/configuration.model";
import {ConfigurationSingleton} from "../model/configuration-singleton.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConfigurationSingletonService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }


  getConfigurations(): Observable<ConfigurationSingleton> {
    const url = configuration.host + '/api/configuration/';
    return this.http.get<ConfigurationSingleton>(url, httpOptions);
  }
}
