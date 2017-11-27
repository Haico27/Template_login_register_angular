import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials), { headers: this.headers })
                    .map((response: HttpResponse<any>) => {
                      let user = <any>response;

                      if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user))
                      }
                      return user

                    })
  }

  logout() {
    localStorage.removeItem('currentUser')
  }
}
