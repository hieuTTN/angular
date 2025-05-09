import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable,throwError } from 'rxjs';
import { OnInit  } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnInit {
    

    constructor(private apiService: ApiService) {}
    
    ngOnInit(): void {
    }
        
    payCod(orderDto: any): Observable<any> {
        return this.apiService.postMethodPayload(`invoice/user/create`,orderDto);
    }
        
    requestPayMentMomo(orderDto: any): Observable<any> {
        window.localStorage.setItem('orderinfor', JSON.stringify(orderDto));
        var returnurl = 'http://localhost:4200/thanhcong';
        var paymentDto = {
            content: "Đơn hàng nội thất",
            returnUrl: returnurl,
            notifyUrl: returnurl,
        }
        return this.apiService.postMethodPayload(`urlpayment`,paymentDto);
    }

    checkPayMentMomo(): Observable<any> {
        var uls = new URL(document.URL)
        var orderId = uls.searchParams.get("orderId");
        var requestId = uls.searchParams.get("requestId");
        var orderInfo = window.localStorage.getItem("orderinfor");
        var obj = null;
        if (orderInfo) {
          var obj = JSON.parse(orderInfo);
          obj.requestIdMomo = requestId;
          obj.orderIdMomo = orderId;
        }
        return this.apiService.postMethodPayload(`invoice/user/create`,obj);
    }

}