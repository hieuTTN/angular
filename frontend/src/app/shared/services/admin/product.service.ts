import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {


  private baseUrl = `${environment.apiUrl}/api/product`;
  private baseUrlImage = `${environment.apiUrl}/api/product-image`;

  constructor(private http: HttpClient) {}

  getProducts(idCategory?: number): Observable<Product[]> {
    let url = `${this.baseUrl}/public/findAll-list`;
    if (idCategory && idCategory > 0) {
      url += `?idCategory=${idCategory}`;
    }
    return this.http.get<Product[]>(url);
  }


  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/public/findById?id=${id}`);
  }

  createOrUpdateProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/create-update`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/delete?id=${id}`);
  }

  deleteProductImage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrlImage}/admin/delete?id=${id}`);
  }
}
