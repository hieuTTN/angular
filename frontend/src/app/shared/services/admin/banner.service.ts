import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../user/api.service';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class BannerService {

  constructor(private apiService: ApiService) {}

  getBanner(): Observable<any> {
    return this.apiService.get(`banner/public/search`);
  }

  postBanner(banner: any): Observable<any> {
    if(banner.id == null){
        return this.apiService.postMethodPayload(`banner/admin/create`, banner);
    }
    else{
        return this.apiService.postMethodPayload(`banner/admin/update`, banner);
    }
  }

  delete(id: any): Observable<any> {
    return this.apiService.deleteMethod(`banner/admin/delete?id=${id}`);
  }
}
