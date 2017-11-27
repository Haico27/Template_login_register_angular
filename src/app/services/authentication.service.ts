import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
  loggedIn: boolean = false;

  constructor(private http: HttpClient,
              private router: Router) { }

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
    this.loggedIn = false;
    this.router.navigate(['/login']);

  }

  getToken() {
     let currentUser = JSON.parse(localStorage.getItem('currentUser'))
     if (currentUser != null) {
       return currentUser.token
     }
  }

  isLoggedIn() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log("currentUser in isLoggedIn(): ", currentUser)
    if (currentUser !== null) {
      return true
    } else {
      return false
    }
  }
}
