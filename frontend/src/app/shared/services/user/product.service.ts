import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  getDiscountedProducts(page: number, size: number): Observable<any> {
    return this.apiService.get(`product/public/sanPhamKhuyenMai?page=${page}&size=${size}`);
  }

  getBestSellingProducts(page: number, size: number): Observable<any> {
    return this.apiService.get(`product/public/san-pham-ban-chay-page?page=${page}&size=${size}`);
  }

  getNewProducts(page: number, size: number): Observable<any> {
    return this.apiService.get(`product/public/san-pham-moi?page=${page}&size=${size}`);
  }

  getProductById(id: number): Observable<any> {
    return this.apiService.get(`product/public/findById?id=${id}`);
  }

  getRelatedProducts(id: any): Observable<any> {
    return this.apiService.get(`product/public/san-pham-lien-quan?id=${id}`);
  }

  getProductDetail(id: any): Observable<any> {
    return this.apiService.get(`product/public/findById?id=${id}`);
}
}