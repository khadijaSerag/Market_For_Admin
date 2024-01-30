import { HttpClient, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCarts(param?: any) {
    let params = new HttpParams();
    params = params
      .append('startdate', param?.startdate)
      .append('enddate', param?.enddate);

    if (param?.startdate !== undefined && param?.enddate !== undefined) {
      return this.http.get(environment.baseUrl + 'carts', { params });
    } else {
      return this.http.get(environment.baseUrl + 'carts');
    }
  }

  deleteCart(index: number) {
    return this.http.delete(environment.baseUrl + `carts/${index}`);
  }
}
