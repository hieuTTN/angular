import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../user/api.service';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ThongKeService {

    constructor(private apiService: ApiService) {}

    getSpChay(): Observable<any> {
        return this.apiService.getMethod(`product/public/san-pham-ban-chay`);
    }

    doanhThuThangNay(): Observable<any> {
        return this.apiService.getMethodText(`statistic/admin/revenue-this-month`);
    }

    slQuantri(): Observable<any> {
        return this.apiService.getMethodText(`statistic/admin/number-admin`);
    }

    slSanPham(): Observable<any> {
        return this.apiService.getMethodText(`statistic/admin/number-product`);
    }

    doanhThuNgay(): Observable<any> {
        return this.apiService.getMethodText(`statistic/admin/revenue-today`);
    }

    soDonHtNgay(): Observable<any> {
        return this.apiService.getMethodText(`statistic/admin/number-invoice-today-finish`);
    }

    doanhThuNam(year:any): Observable<any> {
        return this.apiService.getMethod(`statistic/admin/revenue-year?year=${year}`);
    }


}
