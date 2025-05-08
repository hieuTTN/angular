import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    token:string = '';

    constructor(private apiService: ApiService) {}
        
    addToCart(productId: number, token: string): Observable<any> {
        return this.apiService.post(`cart/user/create?idproduct=${productId}`, {
        headers: { Authorization: `Bearer ${this.token}` }
        });
    }

    getCartItems(): Observable<any> {
        return this.apiService.get(`cart/user/my-cart`, {
        headers: { Authorization: `Bearer ${this.token}` }
        });
    }

    removeCartItem(cartId: number): Observable<any> {
        return this.apiService.delete(`cart/user/delete?id=${cartId}`, {
        headers: { Authorization: `Bearer ${this.token}` }
        });
    }

    updateCartQuantity(cartId: number, quantity: number): Observable<any> {
        return this.apiService.get(`cart/user/up-and-down-cart?id=${cartId}&quantity=${quantity}`, {
        headers: { Authorization: `Bearer ${this.token}` }
        });
    }
}