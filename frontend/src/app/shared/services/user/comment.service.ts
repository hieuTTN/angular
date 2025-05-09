import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { OnInit  } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CommentService implements OnInit {
    

    constructor(private apiService: ApiService) {}
    
    ngOnInit(): void {
    }
        
    getComment(productId: any): Observable<any> {
        return this.apiService.getMethod(`product-comment/public/find-by-product?idproduct=${productId}`);
    }
        
    postComment(comment: any): Observable<any> {
        return this.apiService.postMethodPayload(`product-comment/user/create`, comment);
    }

}