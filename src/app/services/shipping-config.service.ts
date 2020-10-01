import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {ShippingConfig} from "../model/shipping-config.model";
import {OrderCriteriaSearch} from "../model/order-criteria-search.model";
import {ShippingConfigCriteriaSearch} from "../model/shipping-config-criteria-search.model";
import {Page} from "../model/page.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ShippingConfigService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }


  getShippingConfigs(search : ShippingConfigCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/shippingConfigs/';
    return this.http.post<Page>(url, search, httpOptions);
  }

  getShippingConfig(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/shippingConfig/' + id;
    return this.http.get<ApiResponse>(url);
  }

  deleteShippingConfig(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/deleteShippingConfig/' + id;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  addShippingConfig(config: ShippingConfig): Observable<number> {
    const url = configuration.host + '/api/addShippingConfig';
    return this.http.post<number>(url, config, httpOptions);
  }

}
