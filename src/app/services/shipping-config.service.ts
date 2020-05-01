import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {Farm} from "../model/farm.model";
import {ShippingConfig} from "../model/shipping-config.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ShippingConfigService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }


  getShippingConfigs(): Observable<Array<Farm>> {
    const url = configuration.host + '/api/shippingConfigs/';
    return this.http.get<Array<Farm>>(url, httpOptions);
  }

  getShippingConfig(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/shippingConfig/' + id;
    return this.http.get<ApiResponse>(url);
  }

  deleteShippingConfig(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/deleteShippingConfig/{id}' + id;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  addShippingConfig(config: ShippingConfig): Observable<number> {
    const url = configuration.host + '/api/addShippingConfig';
    return this.http.post<number>(url, config, httpOptions);
  }

}
