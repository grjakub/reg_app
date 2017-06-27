import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

domain ="http://localhost:8080";

  constructor(private http: Http) {  }

  registerUser(user) {
     return this.http.post(this.domain + '/auth/reg-pannel', user).map(res => res.json())
  }
}
