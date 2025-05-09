import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../user/api.service';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private apiService: ApiService) {}

  getCategories(): Observable<any> {
    return this.apiService.get(`category/public/findAll`);
  }

  postCategory(category: any): Observable<any> {
    return this.apiService.postMethodPayload(`category/admin/create-update`, category);
  }

  delete(id: any): Observable<any> {
    return this.apiService.deleteMethod(`category/admin/delete?id=${id}`);
  }
}
