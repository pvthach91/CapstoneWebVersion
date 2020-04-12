import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {Product} from "../model/product.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Page> {
    const url = configuration.host + '/api/guest/products/';
    return this.http.get<Page>(url, httpOptions);
  }

  getProduct(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/guest/product/' + id;
    return this.http.get<ApiResponse>(url);
  }

  addProduct(product: Product): Observable<Product> {
    const url = configuration.host + '/api/product/add';
    return this.http.post<Product>(url, product, httpOptions);
  }

  deleteProduct(dishId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/product/delete/' + dishId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
