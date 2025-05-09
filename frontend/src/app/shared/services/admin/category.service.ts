import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    let url = `${this.baseUrl}/public/findAll`;
    return this.http.get(url);
  }
}
