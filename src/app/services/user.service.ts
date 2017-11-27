import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post('/api/user', user).map((response: Response) => response)
  }

  getAllUsers() {
    return this.http.get('/api/users').map((response: HttpResponse<any>) => <any>response);
  }
}
