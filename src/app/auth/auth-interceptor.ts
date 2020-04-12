import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';
import {Observable} from "rxjs";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let authReq = req;
        const token = this.token.getToken();
        // if (token != null) {
        //     authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        // }
        // return next.handle(authReq);
        if (token != null) {
            const headers = {
                'Authorization': 'Bearer ' + token,
            };
            if (req.responseType === 'json') {
                headers['Content-Type'] = 'application/json';
            }
            req = req.clone({
                setHeaders: headers
            });
        }

        return next.handle(req);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
