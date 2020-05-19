import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {Product} from "../model/product.model";
import {ProductCriteriaSearch} from "../model/product-criteria-search.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getProducts(criteria: ProductCriteriaSearch): Observable<Array<Product>> {
    const url = configuration.host + '/api/guest/products/';
    return this.http.post<Array<Product>>(url, criteria, httpOptions);
  }

  getProductsForUser(criteria: ProductCriteriaSearch): Observable<Array<Product>> {
    const url = configuration.host + '/api/products/';
    return this.http.post<Array<Product>>(url, criteria, httpOptions);
  }

  getProduct(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/guest/product/' + id;
    return this.http.get<ApiResponse>(url);
  }

  addProduct(product: Product): Observable<ApiResponse> {
    const url = configuration.host + '/api/product/add';
    return this.http.post<ApiResponse>(url, product, httpOptions);
  }

  approve(productId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/product/approve/' + productId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  deleteProduct(dishId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/product/delete/' + dishId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
