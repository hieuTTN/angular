import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { OnInit  } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    
    constructor(private apiService: ApiService) {}
        
    getUserInfor(): Observable<any> {
        return this.apiService.getMethod(`user/user-logged`);
    }
        
    changePass(pass:string, newpass:string): Observable<any> {
      var passw = {
        oldPass: pass,
        newPass: newpass
      } 
      return this.apiService.postMethodPayload(`user/change-password`,passw);
    }
        
    changeInfor(fullname:string, phone:string, address: string): Observable<any> {
      return this.apiService.postMethod(`user/change-infor?fullName=${fullname}&phone=${phone}&address=${address}`);
    }

}