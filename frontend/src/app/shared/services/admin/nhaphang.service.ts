import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../user/api.service';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class NhapHangService {

  constructor(private apiService: ApiService) {}

    getNhapHang(from:any, to:any, idproduct:any): Observable<any> {
        var url = 'import-product/admin/findAll?s=1';
        if (from != null && to != null && from != "" && to != "") {
            url += '&from=' + from + '&to=' + to;
        }
        if (idproduct > 0) {
            url += '&idproduct='+idproduct;
        }
        return this.apiService.getMethod(url);
    }

    getDetail(id:any): Observable<any> {
        return this.apiService.getMethod(`import-product/admin/findById?id=${id}`);
    }

    postNhapHang(obj:any): Observable<any> {
        return this.apiService.postMethodPayload(`import-product/admin/create`,obj);
    }
    

    delete(id:any): Observable<any> {
        return this.apiService.deleteMethod(`import-product/admin/delete?id=${id}`);
    }
    

}
