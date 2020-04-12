import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {OrderCriteriaSearch} from "../model/order-criteria-search.model";
import {OrderRequest} from "../model/post/order-request.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getOrders(search : OrderCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/orders';
    return this.http.post<Page>(url, search, httpOptions);
  }

  getOrder(orderId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/order/' + orderId;
    return this.http.get<ApiResponse>(url);
  }

  trackOrder(orderId: string): Observable<ApiResponse> {
    const url = configuration.host + '/api/guest/order/track/' + orderId;
    console.log(url);
    return this.http.get<ApiResponse>(url);
  }

  create(order: OrderRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/order/create';
    return this.http.post<ApiResponse>(url, order, httpOptions);
  }

  deleteOrder(orderId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/order/delete/' + orderId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  finish(orderId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/order/finish/' + orderId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  process(orderId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/order/process/' + orderId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  cancel(orderId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/order/cancel/' + orderId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  deliver(orderId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/order/deliver/' + orderId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
