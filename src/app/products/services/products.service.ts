import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(environment.baseUrl + 'products');
  }

  getAllCategories() {
    return this.http.get(environment.baseUrl + 'products/categories');
  }

  getSpecificCategory(specificCatg: string) {
    return this.http.get(
      environment.baseUrl + `products/category/${specificCatg}`
    );
  }

  getSingleProduct(id: number) {
    return this.http.get(environment.baseUrl + `products/${id}`);
  }

  addNewProduct(model: any) {
    return this.http.post(environment.baseUrl + 'products', { model });
  }

  updateProduct(id: number, model: any) {
    return this.http.put(environment.baseUrl + `products/${id }`, { model });
  }
}
