import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {Product} from "../model/product.model";
import {Comment} from "../model/comment.model";
import {SubComment} from "../model/subcomment.model";
import {Rate} from "../model/rate.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getRates(productId: number): Observable<Page> {
    const url = configuration.host + '/api/guest/rates/' + productId;
    return this.http.get<Page>(url, httpOptions);
  }

  addRate(productId: number, rate: Rate): Observable<Product> {
    const url = configuration.host + '/api/rate/addRate/' + productId;
    return this.http.post<Product>(url, rate, httpOptions);
  }
}
