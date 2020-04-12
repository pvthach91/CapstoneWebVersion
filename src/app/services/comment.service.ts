import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {Product} from "../model/product.model";
import {Comment} from "../model/comment.model";
import {SubComment} from "../model/subcomment.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getComments(productId: number): Observable<Page> {
    const url = configuration.host + '/api/guest/comments/' + productId;
    return this.http.get<Page>(url, httpOptions);
  }

  getSubComments(commentId: number): Observable<Page> {
    const url = configuration.host + '/api/guest/subcomments/' + commentId;
    return this.http.get<Page>(url, httpOptions);
  }

  addComment(productId: number, comment: Comment): Observable<Product> {
    const url = configuration.host + '/api/comment/addComment/' + productId;
    return this.http.post<Product>(url, comment, httpOptions);
  }

  addSubComment(commentId: number, comment: SubComment): Observable<Product> {
    const url = configuration.host + '/api/comment/addSubComment/' + commentId;
    return this.http.post<Product>(url, comment, httpOptions);
  }
}
