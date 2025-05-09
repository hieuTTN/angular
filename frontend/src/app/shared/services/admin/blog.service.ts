import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../user/api.service';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {

  constructor(private apiService: ApiService) {}

    getBlog(): Observable<any> {
        return this.apiService.getMethod('blog/public/findAll-list');
    }

    getDetail(id:any): Observable<any> {
        return this.apiService.getMethod(`blog/public/findById?id=${id}`);
    }

    postBlog(obj:any): Observable<any> {
        return this.apiService.postMethodPayload(`blog/admin/create-or-update`,obj);
    }
    

    delete(id:any): Observable<any> {
        return this.apiService.deleteMethod(`blog/admin/delete?id=${id}`);
    }
    

}
