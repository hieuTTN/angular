import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../user/api.service';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {

  constructor(private apiService: ApiService) {}

  getInvoice(start:any, end:any, type:any, trangthai:any): Observable<any> {
    var url = 'invoice/admin/find-all?s=1';
    if (start != "" && end != "" ) {
        url += '&from=' + start + '&to=' + end;
    }
    if (type != -1 && type != null && type != '') {
        url += '&paytype=' + type;
    }
    if (trangthai != -1 && trangthai != null && trangthai != '') {
        url += '&status=' + trangthai;
    }
    return this.apiService.getMethod(url);
  }

    getDetailInvoice(id:any): Observable<any> {
        return this.apiService.getMethod(`invoice-detail/admin/find-by-invoice?idInvoice=${id}`);
    }

    updateStatus(id:any,idtrangthai:any): Observable<any> {
        return this.apiService.postMethod(`invoice/admin/update-status?idInvoice=${id}&status=${idtrangthai}`);
    }
    

    loadStatus(): Observable<any> {
        return this.apiService.getMethod(`invoice/admin/all-status`);
    }
    

}
