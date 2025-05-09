import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { OnInit  } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
    
    constructor(private apiService: ApiService) {}
        
    getBlogs(page: number, size: number): Observable<any> {
        return this.apiService.get(`blog/public/findAll-page?page=${page}&size=${size}`);
    }

    getBlogDetail(id: any): Observable<any> {
        return this.apiService.get(`blog/public/findById?id=${id}`);
    }
        
}