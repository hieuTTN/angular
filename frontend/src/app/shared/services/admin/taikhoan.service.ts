import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../user/api.service';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class TaiKhoanService {

  constructor(private apiService: ApiService) {}

  getTaiKhoan(role:any): Observable<any> {
    var url = 'admin/get-user-by-role';
    if(role != null && role != ''){
        url += '?role=' + role;
    }
    return this.apiService.getMethod(url);
  }

  postUser(user: any): Observable<any> {
    return this.apiService.postMethodPayload(`admin/addaccount`, user);
  }

  lockUnLock(id: any): Observable<any> {
    return this.apiService.postMethod(`admin/lockOrUnlockUser?id=${id}`);
  }
}
