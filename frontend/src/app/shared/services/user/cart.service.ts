import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { OnInit  } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
    
    token:string = '';

    constructor(private apiService: ApiService) {}
    
    ngOnInit(): void {
        this.token = window.localStorage.getItem("token") || '';
    }
        
    addToCart(productId: number): Observable<any> {
        return this.apiService.postMethod(`cart/user/create?idproduct=${productId}`);
    }

    getNumCart(): Promise<any> {
        this.token = window.localStorage.getItem("token") || '';
        var res = fetch(`http://localhost:8080/api/cart/user/count-cart`, {
            method: 'Get',
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
        })
        return res;
    }

    getCartItems(): Observable<any> {
        return this.apiService.getMethod(`cart/user/my-cart`);
    }

    removeCartItem(cartId: number): Observable<any> {
        return this.apiService.deleteMethod(`cart/user/delete?id=${cartId}`);
    }

    updateCartQuantity(cartId: number, quantity: number): Observable<any> {
        return this.apiService.getMethod(`cart/user/up-and-down-cart?id=${cartId}&quantity=${quantity}`);
    }
}