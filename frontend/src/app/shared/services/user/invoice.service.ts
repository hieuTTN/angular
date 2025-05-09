import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { OnInit  } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
    
    constructor(private apiService: ApiService) {}
        
    getMyInvoice(): Observable<any> {
        return this.apiService.getMethod(`invoice/user/find-by-user`);
    }
        
    getDetailInvoice(id:number): Observable<any> {
        return this.apiService.getMethod(`invoice-detail/user/find-by-invoice?idInvoice=${id}`);
    }
        
    cancelInvoice(id:number): Observable<any> {
        return this.apiService.postMethod(`invoice/user/cancel-invoice?idInvoice=${id}`);
    }

}