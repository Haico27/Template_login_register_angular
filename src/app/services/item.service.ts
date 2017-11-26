import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Item } from './../models/item'

@Injectable()

export class ItemService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private itemsUrl = 'api/items';
  private itemUrl = 'api/item';

  items: Item[];
  item: Item;

  constructor(private http: HttpClient) {

  }

  getItems(): Observable<Item[]> {
    //the <Item[]> tells the HttpClient which type the response will be, an array of Items
    return this.http.get<Item[]>(this.itemsUrl)
  }

  addItem(name: Object): Observable<Item> {
    return this.http.post<Item>(this.itemUrl, JSON.stringify({name}), {headers: this.headers})
  }
}
