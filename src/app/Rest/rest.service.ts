import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class RestService implements HttpInterceptor {
    static url = 'http://localhost:8000/api/';
    errors: string[] = [];
    message: any = [];
    httpOptions = {};
    success: boolean = false;
    Token: string;

    constructor(
        protected http: HttpClient,
        protected router: Router,
        private cookieService: CookieService,
    ) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(5),
            catchError((error, caught) => {
                this.handleAuthError(error);
                return of(error);
            }) as any,
        );
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.router.navigateByUrl('/');
            return of(err.message);
        }
        this.filterError(err);
        throw err;
    }

    static getUrl(): string {
        return RestService.url;
    }

    setToken(token) {
        this.cookieService.set('token', token);
        // this.Token = token;
    }

    getToken() {
        return this.cookieService.get('token');
        // return this.Token;
    }

    isToken() {
        return this.cookieService.check('token');
    }

    getID_station() {
        return this.cookieService.get('ID_station');
    }

    getHeader() {
        const headers_object = new HttpHeaders({
            Authorization: 'bearer ' + this.getToken(),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });

        this.httpOptions = {
            headers: headers_object,
        };
    }

    removeHeader() {
        this.cookieService.deleteAll();
        this.httpOptions = {};
    }

    sendRequest(method, add, data) {
        this.getHeader();

        if (data != null) {
            this.httpOptions['body'] = data;
        }

        return this.http.request(
            method,
            RestService.getUrl() + add,
            this.httpOptions,
        );
    }

    sendRequestAPI(method, add, data) {
        this.getHeader();

        if (data != null) {
            this.httpOptions['body'] = data;
        }

        return this.http.request(
            method,
            'http://samacontrol.com:9090/api.samacontrol.com/' + add,
            this.httpOptions,
        );
    }

    sendRequestSingle(method, add, data) {
        this.getHeader();

        if (data != null) {
            this.httpOptions['body'] = data;
        }

        return this.http.request(method, add);
    }

    Custom(method, add, header) {
        return this.http.request(method, add, header);
    }

    filterError(error) {
        const errorText = error.error.error;
        this.errors = [];

        if (error.status === 403) {
            this.errors.push('خطا در اتصال به سرور');
        }

        if (typeof errorText === 'object') {
            for (const val in errorText) {
                if (errorText.hasOwnProperty(val)) {
                    this.errors.push(errorText[val]);
                }
            }
        } else if (errorText === undefined) {
            this.errors.push('خطا در اتصال به سرور');
        } else {
            this.errors.push(errorText);
        }

        return this.errors;
    }
}
